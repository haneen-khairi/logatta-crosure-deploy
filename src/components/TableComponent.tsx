import { Table, TableContainer, Thead, Tbody , Tr, Th , Td, Button } from '@chakra-ui/react'
import ShowMoreButton from './buttons/ShowMore'
import * as XLSX from "xlsx"

export default function TableComponent({
  data,
  setShowDetails,
  tableName = 'Table Name',
  headers = [], // New prop to define table headers
}: any) {
  const downloadExcel = (fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const blob = new Blob([s2ab(XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }))], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

// Utility function for string to ArrayBuffer conversion
function s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
  return <>
  <h3 style={{
    textAlign:'center',
    fontWeight: 700,
    color: '#842888'
  }}> {tableName}</h3>
    {data.length > 0 ? <><TableContainer key={data.id} overflowY={'auto'} maxHeight={'500px'}>
      <Table variant="striped">
        {/* <TableCaption>{tableName}</TableCaption> */}
        <Thead>
          <Tr>
            {headers.map((header: any, index: number) => (
              <Th key={index}>{header.name}</Th>
            ))}
            {tableName === 'Properties' && <Th>Show details</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((property: any) => (
            <Tr key={property.id}>
              {headers.map((header: any, index: number) => (
                <Td key={index} isNumeric={header.isNumeric}>
                  {property[header.key]}
                </Td>
              ))}
              {tableName === 'Properties' && (
                <Td>
                  <ShowMoreButton onClick={() => setShowDetails(property.id)} />
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
      <Button
              w="fit-content"
              colorScheme="primary"
              type="submit"
              color={'#fff'}
              borderRadius={'50px'}
              fontSize={'14px'}
              // style={{
              //   // width: 'fit-content',
              //   margin: '0 auto'
              // }}
              // borderRadius={borderRound}
              py="7"
              onClick={() => downloadExcel(tableName)}
            >
              Download table 
              {/* {tableName} in Excel */}
            </Button>
            </>
            : <p>No data found</p> }
  </>
    
  
}

