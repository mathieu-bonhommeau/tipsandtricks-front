import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { UserGatewayApi } from '../../server-side/user/user-gateway.api.ts';
import {UserGatewayInterface} from "../../domain/user/port/user-gateway.interface.ts";

dependencyContainer.set<UserGatewayInterface>('UserGateway', () => {
    return new UserGatewayApi();
});

export default dependencyContainer;
