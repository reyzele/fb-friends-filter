import InitApp from "./common/auth";
import Dnd from "./common/dnd";
import Filter from "./common/filter";

const params = InitApp();
const filterMap = Filter(params);

Dnd(params, filterMap);
