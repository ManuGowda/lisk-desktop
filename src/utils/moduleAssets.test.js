import { MODULE_ASSETS_NAME_ID_MAP } from '@constants';
import { getModuleAssetSenderLabels } from './moduleAssets';

describe('Utils: moduleAssets', () => {
  describe('getModuleAssetSenderLabels', () => {
    it('should return a dictionary of strings', () => {
      const t = jest.fn(str => str);
      const dict = getModuleAssetSenderLabels(t);
      const label = dict[MODULE_ASSETS_NAME_ID_MAP.transfer];

      expect(label).toBeDefined();
      expect(typeof label).toBe('string');
      expect(t).toHaveBeenCalled();
    });
  });
});
