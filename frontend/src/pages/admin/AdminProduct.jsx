import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ImageUpload from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { Edit, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const AdminProduct = () => {
    const { products } = useSelector(store => store.product)
    const [editProduct, setEditProduct] = useState(null)
    const [open, setOpen] = useState(false)
    const [deleteDialogId, setDeleteDialogId] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const accessToken = localStorage.getItem("accessToken")
    const dispatch = useDispatch()

    let filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortOrder === 'lowToHigh') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.productPrice - b.productPrice)
    }
    if (sortOrder === 'highToLow') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.productPrice - a.productPrice)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditProduct(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSave = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("productName", editProduct.productName)
        formData.append("productDesc", editProduct.productDesc)
        formData.append("productPrice", editProduct.productPrice)
        formData.append("category", editProduct.category)
        formData.append("brand", editProduct.brand)

        const exisitingImages = (editProduct.productImg || [])
            .filter((img) => !(img instanceof File) && img.public_id)
            .map((img) => img.public_id)
        formData.append("existingImages", JSON.stringify(exisitingImages))

        editProduct.productImg
            .filter((img) => img instanceof File)
            .forEach((file) => {
                formData.append("files", file)
            })

        try {
            const res = await axios.put(`${import.meta.env.VITE_URL}/api/v1/product/update/${editProduct._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                toast.success("product updated successfully")
                const updateProducts = products.map((p) =>
                    p._id === editProduct._id ? res.data.product : p)
                dispatch(setProducts(updateProducts))
                setOpen(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const deleteProductHandler = async (productId) => {
        try {
            const remainingProducts = products.filter((product) => product._id !== productId)
            const res = await axios.delete(`${import.meta.env.VITE_URL}/api/v1/product/delete/${productId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setProducts(remainingProducts))
                setDeleteDialogId(null)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="pt-20 md:pt-24 pb-6 md:pb-10 px-4 md:px-8 flex flex-col gap-3 min-h-screen bg-gray-100">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
                <div className="relative bg-white rounded-lg w-full sm:w-[400px]">
                    <Input values={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search Product..." className="w-full items-center" />
                    <Search className="absolute right-3 top-1.5 text-gray-500" />
                </div>
                <Select onValueChange={(value) => setSortOrder(value)} >
                    <SelectTrigger className="w-full sm:w-[200px] bg-white">
                        <SelectValue placeholder="Sort by Price " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="lowToHigh">Price: Low To High</SelectItem>
                        <SelectItem value="highToLow">Price:High To Low </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {
                filteredProducts.map((product, index) => {
                    return <Card key={index} className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex gap-3 items-center min-w-0 flex-1">
                                <img
                                    src={product.productImg?.[0]?.url || "/siddharthaphoto3.jpg"}
                                    alt={product.productName}
                                    className="w-16 h-16 sm:w-24 sm:h-24 shrink-0 object-cover rounded"
                                />
                                <h1 className="font-bold text-gray-700 line-clamp-2 min-w-0">{product.productName}</h1>
                            </div>
                            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                                <h1 className="font-semibold text-gray-800">₹{product.productPrice}</h1>
                                <div className="flex gap-3">
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger asChild>
                                            <Edit onClick={() => { setOpen(true), setEditProduct(product) }} className="text-green-500 cursor-pointer" />
                                        </DialogTrigger>
                                        <DialogContent className="w-[95vw] sm:max-w-[625px] max-h-[85vh] overflow-y-scroll">
                                            <DialogHeader>
                                                <DialogTitle>Edit Product</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your product here. click save when you&apos;re done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col gap-2">
                                                <div className="grid gap-2">
                                                    <Label>Product Name</Label>
                                                    <Input value={editProduct?.productName} onChange={handleChange} type='text' name="productName" placeholder='Ex-Iphone' required />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Price</Label>
                                                    <Input value={editProduct?.productPrice} onChange={handleChange} type='number' name="productPrice" required />
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <Label>Brand</Label>
                                                        <Input value={editProduct?.brand} onChange={handleChange} type='text' name="brand" placeholder='Ex-Apple' required />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Category</Label>
                                                        <Input value={editProduct?.category} onChange={handleChange} type='text' name="category" placeholder='Ex-mobile' required />
                                                    </div>
                                                </div>
                                                <div className="grid gap-2">
                                                    <div className="flex items-center">
                                                        <Label>Description</Label>
                                                    </div>
                                                    <Textarea value={editProduct?.productDesc} onChange={handleChange} name="productDesc" placeholder='Enter brief description of product' />
                                                </div>
                                                <ImageUpload productData={editProduct} setProductData={setEditProduct} />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button onClick={handleSave} type="submit">Save Product</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <AlertDialog open={deleteDialogId === product._id} onOpenChange={(val) => setDeleteDialogId(val ? product._id : null)}>
                                        <AlertDialogTrigger>
                                            <Trash2 className="text-red-500 cursor-pointer" />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="w-[90vw] sm:w-full">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteProductHandler(product._id)} >Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </div>
                    </Card>
                })
            }
        </div>
    )
}
export default AdminProduct;