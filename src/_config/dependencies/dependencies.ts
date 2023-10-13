import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { UserGatewayApi } from '../../server-side/user/user-gateway.api.ts';
import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface.ts';
import { TipsGatewayApi } from '../../server-side/tips/tips-gateway.api.ts';

dependencyContainer.set<UserGatewayInterface>('UserGateway', () => {
    return new UserGatewayApi();
});

dependencyContainer.set<TipsGatewayInterface>('TipsGateway', () => {
    return new TipsGatewayApi();
});

export default dependencyContainer;
