import { Test, TestingModule } from '@nestjs/testing';
import { PermissionResolver } from './permission.resolver';

describe('PermissionResolver', () => {
  let resolver: PermissionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionResolver],
    }).compile();

    resolver = module.get<PermissionResolver>(PermissionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
