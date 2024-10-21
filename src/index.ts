import { server } from './app';
import { ENV_VARS } from './constants/envs'

const port = ENV_VARS.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});