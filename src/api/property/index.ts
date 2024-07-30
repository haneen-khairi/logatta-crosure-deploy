import api from "..";

const details = (property: number) =>
  api.get(`residential/property/${property}/detail/`);

const summary = (property: number) =>
  api.get(`residential/property/${property}/summary/`);

export { details, summary };
