import { NodeDataProvider } from '../types';
import * as process from "process";

export const getDataProvider = () => {
  const envDataProvider = process.env.NODE_DATA_PROVIDER;

  if (!envDataProvider) {
    throw new Error('NODE_DATA_PROVIDER is not defined');
  }
  if (envDataProvider === 'magento') {
    return NodeDataProvider.MAGENTO;
  }
  if (envDataProvider === 'commerceTools') {
    return NodeDataProvider.COMMERCE_TOOLS;
  }
  throw new Error(`NODE_DATA_PROVIDER should be one of: magento, commerceTools. But got: ${envDataProvider}`);
};
