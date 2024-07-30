// import { RepeatIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";

import * as UserAPI from "../../../api/user/";
import FormRenderer from "../../../components/forms/FormRenderer";
import AuthLayout from "../../../layouts/auth";
import { login } from "../../../redux/actions/auth";
import { Image } from "@chakra-ui/image";

const LoginPage = () => {
  const dispatch = useDispatch();
  function getWelcBackImage(){
    return <Image height={'20px'} width={'20px'} src="welc_back.svg" />;
  }
  const inputs = [
    {
      placeholder: "Email",
      name: "email",
      type: "email",
      required: true,
      fullWidth: 12,
      double: false,
      triple: false,
    },
    {
      placeholder: "Password",
      name: "password",
      type: "password",
      required: true,
      fullWidth: 12,
      double: false,
      triple: false,
    },
    {
      title: "Remember Me",
      name: "remember",
      type: "checkbox",
      required: false,
      fullWidth: 12,
      double: true,
      triple: false,
    },
  ];

  const onSubmit = (data: object) => {
    UserAPI.loginAPI(data).then((res: any) => {
      dispatch(
        login({
          token: res.access,
          refreshToken: res.refresh,
          user: { name: "Name" },
        })
      );
    });
  };

  return (
    <AuthLayout
      icon={getWelcBackImage()}
      title="Welcome back,"
      subtitle="Please enter your credentials to login to your account."
    >
      <FormRenderer inputs={inputs} onSubmit={onSubmit} submitText="Log in" />
    </AuthLayout>
  );
};

export default LoginPage;
