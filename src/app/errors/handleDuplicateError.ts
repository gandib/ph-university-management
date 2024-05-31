import { TErrorSources } from '../interface/error';

const handleDuplicateError = (error: any) => {
  // Extract value within double qoutes using regex
  const match = error.message.match(/"([^"]*)"/);
  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exist!`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: `${extractedMessage} is already exist!`,
    errorSources,
  };
};

export default handleDuplicateError;
