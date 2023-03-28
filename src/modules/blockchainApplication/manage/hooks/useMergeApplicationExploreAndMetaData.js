import { useBlockchainApplicationMeta } from './queries/useBlockchainApplicationMeta';

const useMergeApplicationExploreAndMetaData = (appOnChainData) => {
  const chainIDs = appOnChainData?.map((data) => data.chainID).join(',');
  const { data: { data: appMetaData } = {}, isLoading } = useBlockchainApplicationMeta({
    config: { params: { chainID: chainIDs } },
    options: { enabled: !!chainIDs?.length },
  });
  return isLoading ? appOnChainData : appMetaData;
};

export default useMergeApplicationExploreAndMetaData;
