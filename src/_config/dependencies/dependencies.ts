import dependencyContainer from '../../_dependencyContainer/dependencyContainer.ts';
import { UserApi } from '../../server-side/user/user.api.ts';

dependencyContainer.set<UserApi>('UserApi', () => {
    return new UserApi();
});

export default dependencyContainer;
