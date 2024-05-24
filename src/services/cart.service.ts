import { Cart, CartProduct } from "../models";
import { ApiError, ApiResponse, deleteSuccess, ErrorCodes, fetchSuccess, notFound, SuccessCodes, updateSuccess } from "../utils";

export class CartService {
    async getCart(id: string) {
        const data = await Cart.findOne({ userid: id });

        // const products = await CartProduct.find({ cartid: data!._id })
        const products = await CartProduct.aggregate([
            {
              $match: {
                cartid:data!._id
              }
            },
            {
              $lookup: {
                from: "products",
                localField: "productid",
                foreignField: "_id",
                as: "products"
              }
            },
            {
              $lookup: {
                from: "categories",
                localField: "products.category",
                foreignField: "_id",
                as: "category"
              }
            },
            {
              $addFields: {
                subtotal: {$multiply:["$productquantity",{$first:["$products.price"]}]}
              }
            },
            {
              $project: {
                product :{$first:["$products.name"]},
                price :{$first:["$products.price"]},
                productquantity:1,
                subtotal:1,
                category:{$first:["$category.name"]}
              }
            }
          ])
          let total =0;
          for(let item of products){
            total+= item.subtotal
          }
        return new ApiResponse(SuccessCodes.ok, {...products,total:total}, fetchSuccess("cart"))
    }

    async addCartProduct(id: string, productid: string, quantity: number) {
        const data = await Cart.findOne({ userid: id });
        const verifyProduct = await CartProduct.findOne({
            productid: productid,
            cartid: data!._id
        })
        let product: any = null;
        if (!verifyProduct) {
            product = await CartProduct.create({
                productid: productid,
                productquantity: quantity,
                cartid: data!._id
            })
        } else {
            product = await CartProduct.findByIdAndUpdate(verifyProduct._id, {
                productid: productid,
                productquantity: quantity+verifyProduct.productquantity,
                cartid: data!._id
            })
        }
        return new ApiResponse(SuccessCodes.ok, product,updateSuccess("product"))
    }
    async updateCartProduct(id: string, productid: string, quantity: number) {
        const data = await Cart.findOne({ userid: id });
        const verifyProduct = await CartProduct.findOne({
            productid: productid,
            cartid: data!._id
        })
        let product: any = null;
        if (!verifyProduct) {
            throw new ApiError(ErrorCodes.notFound, notFound("product"))
        } else {
            product = await CartProduct.findByIdAndUpdate(verifyProduct._id, {
                productid: productid,
                productquantity: quantity,
                cartid: data!._id
            })
        }
        return new ApiResponse(SuccessCodes.ok, product, updateSuccess("product"))
    }

    async deleteProduct(id: string, productid: string) {
        const data = await Cart.findOne({ userid: id });
        const verifyProduct = await CartProduct.findOne({
            productid: productid,
            cartid: data!._id
        })
        if (!verifyProduct) {
            throw new ApiError(ErrorCodes.notFound, notFound("product"))
        }
        const product = await CartProduct.findByIdAndDelete(verifyProduct._id)
        return new ApiResponse(SuccessCodes.ok, product, deleteSuccess("product"))
    }
}