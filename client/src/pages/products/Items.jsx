import {
  ArrowForwardIos,
  MedicalServices,
  CurrencyExchange,
  Add,
  Visibility,
  Close,
  Search,
  RestartAlt,
} from "@mui/icons-material";
import SnackbarAlert from "../../components/Snackback";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../../components/Table";
import { itemsStart, itemsSuccess, itemsFailure } from "../../redux/items";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { request } from "../../request";
import { Link } from "react-router-dom";
import Restock from "../dashboard/Restock";
import Footer from "../../components/Footer";
import Navbar from "../../components/nav/Navbar";
import Loading from "../../components/Loading";
import AlertComponent from "../../components/Alert";
import SellItemForm from "../dashboard/Sell";
import AddItemForm from "../dashboard/AddItem";
import QuickStat from "./QuickStat";
const Items = () => {
  const storeId = localStorage.getItem("storeId");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(itemsStart);
    try {
      const fetchData = async () => {
        const items = await request.get(`/items?storeId=${storeId}`);
        dispatch(itemsSuccess(items.data));
      };
      fetchData();
    } catch (err) {
      dispatch(itemsFailure(err.response.data));
    }
  }, [dispatch, storeId]);
  const [openAdd, setOpenAdd] = useState(false);
  const allItems = useSelector((state) => state.items.Items);
  const [items, setItems] = useState(allItems);
  const [search, setSearch] = useState("");
  const [openSell, setOpenSell] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [specs, setSpecs] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [itemsNum, setItemsNum] = useState(items?.length);
  const outStock = items?.filter((drug) => drug.stock === 0).length;
  const [active, setAtive] = useState(itemsNum - outStock);

  //   ADD DRUG
  const handleAdd = async () => {
    setLoading(true);
    const drugDetails = {
      storeId,
      name,
      stock,
      brand,
      specs: specs.split(", "),
      price,
      id: (Math.floor(Math.random() * 100000) + 100000).toString().substring(1),
      createdAt: moment().format("DD/MM/YYYY h:mm:ss"),
      updatedAt: moment().format("DD/M/YYYY h:mm:ss"),
    };
    if (!name || !stock || !price) {
      setOpenSnack(true);
      setMessage("Provide valid data for name, stock or price");
      setLoading(false);
    } else {
      try {
        setOpenSnack(true);
        const res = await request.post("/devices", drugDetails);
        setItems([drugDetails, ...items]);
        setItemsNum(itemsNum + 1);
        setAtive(active + 1);
        setMessage(res.data);
        setName("");
        setPrice("");
        setStock(0);
        setSpecs("");
        setLoading(false);
      } catch (err) {
        setMessage(err.response.data);
        setLoading(false);
      }
    }
  };
  //   SELL ITEM
  const sellItem = async () => {
    if (!quantity || quantity < 1) {
      setSeverity("error");
      setMessage("Enter valid quantity");
      setOpenAlert(true);
    } else {
      const salesDetails = {
        device_name: name,
        device_id: id,
        cost: price * quantity,
        quantity,
        storeId,
        createdAt: moment().format("DD/MM/YYYY h:mm:ss"),
        id: (Math.floor(Math.random() * 100000) + 100000)
          .toString()
          .substring(1),
      };
      try {
        const res = await request.post("/sales", salesDetails);
        setQuantity(0);
        setMessage(res.data);
        setOpenAlert(true);
        setSeverity("success");
      } catch (err) {
        setOpenAlert(true);
        setMessage(err.response.data);
        setSeverity("error");
      }
    }
  };

  const itemsColumn = [
    {
      field: "name",
      headerName: "Item",
      width: 200,
      renderCell: (params) => params.row.name,
    },
    {
      headerName: "Action",
      width: 170,
      renderCell: (params) => (
        <div className="action-btn">
          <Link to={`/items/${params.row.id}`}>
            <Visibility className="action-icon" />
          </Link>

          <RestartAlt
            className="action-icon "
            onClick={() => {
              setName(params.row.name);
              setId(params.row.id);
              setOpenStock(true);
            }}
          />
          <CurrencyExchange
            className={params.row.stock < 1 ? "no-show" : `action-icon`}
            onClick={() => {
              setName(params.row.name);
              setPrice(params.row.price);
              setId(params.row.id);
              setOpenSell(true);
              setStock(params.row.stock);
            }}
          />
        </div>
      ),
    },

    { field: "price", headerName: "Price", width: 100 },
    { field: "stock", headerName: "Stock", width: 130 },
    { field: "id", headerName: "ID", width: 70 },
  ];
  const handleRestock = async () => {
    try {
      const res = await request.put("/devices/restock/" + id, { stock });
      setMessage(res.data);
      setSeverity("success");
      setOpenAlert(true);
      setOpenStock(false);
      setStock(0);
    } catch (err) {
      setMessage(err.response.data);
      setSeverity("error");
      setOpenAlert(true);
    }
  };
  const [loading, setLoading] = useState(false);
  // REFRESHING DATA
  const handleRefresh = async () => {
    setLoading(true);
    dispatch(itemsStart());
    try {
      const items = await request.get(`/devices?storeId=${storeId}`);
      dispatch(itemsSuccess(items.data));
      window.location.reload();
    } catch (err) {
      dispatch(itemsFailure());
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar refresh={() => handleRefresh()} />
      <Loading open={loading} />
      <AlertComponent
        open={openAlert}
        severity={severity}
        message={message}
        close={() => {
          setOpenAlert(false);
        }}
      />
      <Restock
        openStock={openStock}
        handleClose={() => setOpenStock(false)}
        name={name}
        restockEvent={(e) => setStock(e.target.value)}
        handleRestock={() => handleRestock()}
      />
      <SellItemForm
        open={openSell}
        quantity={quantity}
        handleClose={() => setOpenSell(false)}
        drugName={name}
        price={price}
        quantityEvent={(e) => setQuantity(e.target.value)}
        handleSellItem={() => sellItem()}
        stock={stock}
      />
      <AddItemForm
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        nameEvent={(e) => setName(e.target.value)}
        stockEvent={(e) => setStock(e.target.value)}
        specsEvent={(e) => setSpecs(e.target.value)}
        priceEvent={(e) => setPrice(e.target.value)}
        brandEvent={(e) => setBrand(e.target.value)}
        handleAdd={() => handleAdd()}
      />
      <SnackbarAlert
        open={openSnack}
        message={message}
        handleClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpenSnack(false);
        }}
      />
      <div className="dashboard-container">
        <div className="dash-left">
          <QuickStat itemsNum={itemsNum} outStock={outStock} active={active} />
          <div className="items-container items-page">
            <div className="add-drug-form">
              <h1 className="heading">Add new drug</h1>
              <TextField
                margin="dense"
                label="Item name"
                type="text"
                fullWidth
                variant="outlined"
                className="dial-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="stock"
                type="number"
                fullWidth
                variant="outlined"
                className="dial-input"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Brand"
                type="text"
                fullWidth
                variant="outlined"
                className="dial-input"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <TextField
                margin="dense"
                onChange={(e) => setSpecs(e.target.value)}
                label="Specification"
                type="text"
                value={specs}
                fullWidth
                variant="outlined"
                className="dial-input"
              />
              <TextField
                margin="dense"
                onChange={(e) => setPrice(e.target.value)}
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
                value={price}
                className="dial-input"
              />
              <button
                className="btn add-drug-btn mt10"
                onClick={() => handleAdd()}
              >
                <Add className="mr10" /> Add Item
              </button>
            </div>
          </div>
        </div>
        <div className="dash-right chart">
          <div className="nav-center">
            <input
              type="text"
              placeholder="Search drug"
              className="search-input"
              onChange={(e) => {
                setSearch(e.target.value);
                setItems(
                  allItems.filter(
                    (drug) =>
                      drug.name &&
                      drug.name
                        .toLowerCase()
                        .indexOf(e.target.value.toLowerCase()) > -1
                  )
                );
              }}
              value={search}
            />
            <div className="search-icons">
              {search && (
                <Close
                  className="search-icon"
                  onClick={() => {
                    setSearch("");
                    setItems(allItems);
                  }}
                />
              )}
              <Search className="search-icon" />
            </div>
          </div>
          <div className="items-top">
            <h1 className="heading">Items</h1>
            <div className="head-links">
              <MedicalServices
                className="icon-link mr10"
                onClick={() => setOpenAdd(true)}
              />
              <Link to="/items">
                <ArrowForwardIos className="icon-link" />
              </Link>
            </div>
          </div>
          <DataTable
            rows={[...items].sort((a, b) =>
              a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            )}
            columns={itemsColumn}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Items;
