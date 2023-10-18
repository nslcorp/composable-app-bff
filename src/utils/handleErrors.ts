import { AxiosError } from 'axios';
import { NotFoundException } from '@nestjs/common';

export const handleErrors = (error: AxiosError) => {
  if (error.response) {
    console.error("Server Error", error.response);

    // @ts-ignore
    const message = error.response.data?.message || error.response.statusText;
    throw new NotFoundException(`Server Error: ${message}`);
  }
  if(error.request) {
    console.error(error.request);
    throw new NotFoundException(`Network Error: ${error.request}`);
  }
  console.log(error);
  throw new NotFoundException(`Error: ${error.message}`);
};
