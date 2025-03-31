import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Define User type
interface User {
  businessName?: string;
  contactNumber?: string;
  industry?: string;
  businessDescription?: string;
  servicesProducts?: string[];
  socialMedia?: string;
  yearsInBusiness?: string;
  address?: string;
}

// Define FormData type
interface FormData {
  businessName: string;
  contactNumber: string;
  industry: string;
  businessDescription: string;
  servicesProducts: string[];
  socialMedia: string;
  yearsInBusiness: string;
  address: string;
}

const AddDetailForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showAddDetailsDialog, setShowAddDetailsDialog] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    contactNumber: "",
    industry: "",
    businessDescription: "",
    servicesProducts: [],
    socialMedia: "",
    yearsInBusiness: "",
    address: "",
  });
  const [newServiceProduct, setNewServiceProduct] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user: User | null = storedUser ? JSON.parse(storedUser) : null;
    console.log("User data:", user);
    if (user && isDetailsIncomplete(user)) {
      console.log("Opening dialog...");
      setShowAddDetailsDialog(true);
    }
  }, []);

  useEffect(() => {
    setIsFormValid(
      !Object.values(formData).some((value) =>
        Array.isArray(value) ? value.length === 0 : !value
      ) && formData.contactNumber.length === 10
    );
  }, [formData]);

  const isDetailsIncomplete = (user: User): boolean => {
    return Object.values({
      businessName: user.businessName,
      contactNumber: user.contactNumber,
      industry: user.industry,
      businessDescription: user.businessDescription,
      servicesProducts: user.servicesProducts,
      socialMedia: user.socialMedia,
      yearsInBusiness: user.yearsInBusiness,
      address: user.address,
    }).some((value) => !value);
  };

  const handleAddServiceProduct = (): void => {
    if (newServiceProduct.trim() && !formData.servicesProducts.includes(newServiceProduct)) {
      setFormData({ ...formData, servicesProducts: [...formData.servicesProducts, newServiceProduct] });
      setNewServiceProduct("");
    }
  };

  const handleRemoveServiceProduct = (service: string): void => {
    setFormData({
      ...formData,
      servicesProducts: formData.servicesProducts.filter((item) => item !== service),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDetails = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    if (!isFormValid) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/adduserdetail`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data?.user));
        toast.success("Details added successfully!");
      }
      setShowAddDetailsDialog(false);
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      console.error("Error saving details:", err);
      toast.error("Failed to add details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={showAddDetailsDialog} onOpenChange={() => {}}>
        <DialogContent className="bg-white text-black border border-gray-300 max-w-[90vw] md:max-w-[600px] lg:max-w-[800px] p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center text-gray-900">
              Complete Your Business Profile
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-600">
              Please fill out all required fields to continue with careerinsight
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-6" onSubmit={handleSaveDetails}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">

              <Label htmlFor="contactNumber" className="font-medium text-gray-900">
                  Contact Number
                </Label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                      alt="India Flag"
                      className="w-6 h-4 rounded-sm"
                    />
                    <span className="font-medium text-gray-900">+91</span>
                  </div>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="Enter your contact number"
                    value={formData.contactNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) {
                        setFormData((prev) => ({ ...prev, contactNumber: value }));
                      }
                    }}
                    className="flex-1 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                    type="text"
                    maxLength={10}
                  />
                </div>
                {formData.contactNumber.length > 0 && formData.contactNumber.length < 10 && (
                  <p className="text-red-500 text-sm font-semibold">
                    Contact number must be 10 digits
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                
              <Label htmlFor="businessName" className="font-medium text-gray-900">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  name="businessName"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="industry" className="font-medium text-gray-900">
                  Industry
                </Label>
                <Input
                  id="industry"
                  name="industry"
                  placeholder="Enter your industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="yearsInBusiness" className="font-medium text-gray-900">
                  Years in Business
                </Label>
                <Input
                  id="yearsInBusiness"
                  name="yearsInBusiness"
                  placeholder="Enter years in business"
                  value={formData.yearsInBusiness}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  type="number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="businessDescription" className="font-medium text-gray-900">
                  Business Description
                </Label>
                <textarea
                  id="businessDescription"
                  name="businessDescription"
                  placeholder="Enter your business description"
                  value={formData.businessDescription}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 min-h-[100px] p-2"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="servicesProducts" className="font-medium text-gray-900">
                  Services/Products
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="newServiceProduct"
                    name="newServiceProduct"
                    placeholder="Add a service or product"
                    value={newServiceProduct}
                    onChange={(e) => setNewServiceProduct(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <Button
                    type="button"
                    onClick={handleAddServiceProduct}
                    disabled={!newServiceProduct.trim()}
                    className="bg-purple hover:bg-purple text-white rounded-md"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.servicesProducts.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-purple-300 text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {service}
                      <button
                        type="button"
                        className="ml-1 text-gray-700 hover:text-gray-900"
                        onClick={() => handleRemoveServiceProduct(service)}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="socialMedia" className="font-medium text-gray-900">
                  Social Media
                </Label>
                <Input
                  id="socialMedia"
                  name="socialMedia"
                  placeholder="Enter your social media handle"
                  value={formData.socialMedia}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="address" className="font-medium text-gray-900">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <DialogFooter className="flex justify-center">
              <Button
                type="submit"
                disabled={loading || !isFormValid}
                className="bg-purple hover:bg-purple text-white font-semibold rounded-lg px-6 py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex flex-row gap-2 items-center">
                    <ImSpinner2 size={20} className="animate-spin" /> Saving
                    your details
                  </div>
                ) : (
                  "Save Details"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddDetailForm;