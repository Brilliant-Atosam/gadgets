import { request } from "../request";
import { itemsStart, itemsSuccess, itemsFailure } from "./items";
import { salesStart, salesSuccess, salesFailure } from "./sales";
export const RefreshAllData = async (dispatch) => {
  dispatch(itemsStart());
  dispatch(salesStart());
  try {
    const items = await request.get("/items");
    dispatch(itemsSuccess(items.data));
    const sales = await request.get("/items");
    dispatch(salesSuccess(sales.data));
  } catch (err) {
    dispatch(itemsFailure());
    dispatch(salesFailure());
  }
};
