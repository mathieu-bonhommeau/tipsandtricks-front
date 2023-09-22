import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { UserGatewayApi } from '../../server-side/user/user-gateway.api.ts';

dependencyContainer.set<UserGatewayApi>('UserGatewayApi', () => {
    return new UserGatewayApi();
});

export default dependencyContainer;
