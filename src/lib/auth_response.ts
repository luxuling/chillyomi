import { AuthResponseBody } from '@interface/auth.interface';

const createResponse = ({ status, message, data }: AuthResponseBody) => {
  return {
    status,
    message,
    data: {
      name: data?.name || null,
      email: data?.email || null,
    },
  };
};

export default createResponse;
