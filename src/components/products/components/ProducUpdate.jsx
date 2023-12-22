import React, { Component } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";

class ProductUpdate extends Component {
  handleChangeInput = (e) => {
    const { setEditedProduct, editedProduct } = this.props;
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  handleClose = () => {
    this.props.setEditedProduct({ id: "", title: "", description: "", price: "", image: "" });
    this.props.setVisible(false);
  };

  handleConfirm = async () => {
    try {
      const { editedProduct, setProducts } = this.props;
      if (!editedProduct.title || !editedProduct.description || !editedProduct.price || editedProduct.price < 0 || !editedProduct.image) {
        toast.error("Please fill all fields");
        return;
      }
      setProducts((prevProducts) => {
        const index = prevProducts.findIndex((product) => product.id === editedProduct.id);
        prevProducts[index] = editedProduct;
        return [...prevProducts];
      });
      toast.success("Product Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Product Updated Failed");
    } finally {
      this.handleClose();
    }
  };

  render() {
    const { visible, editedProduct } = this.props;
    return (
      <>
        <Dialog open={visible} onClose={this.handleClose}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField name="title" margin="dense" multiline label="Title" fullWidth value={editedProduct.title} onChange={this.handleChangeInput} />
            <TextField name="description" margin="dense" multiline label="Description" fullWidth value={editedProduct.description} onChange={this.handleChangeInput} />
            <TextField name="price" margin="dense" label="Price" type="number" value={editedProduct.price} fullWidth onChange={this.handleChangeInput} />
            <TextField name="image" margin="dense" multiline label="Image Url" value={editedProduct.image} fullWidth onChange={this.handleChangeInput} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default ProductUpdate;
