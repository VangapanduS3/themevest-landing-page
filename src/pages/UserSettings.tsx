
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, CreditCard, UserIcon, Building, SunIcon, MoonIcon, Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UserSettings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Parse the tab parameter from the URL and update activeTab
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");
    if (tabParam && ["profile", "brokerage", "payment", "appearance"].includes(tabParam)) {
      setActiveTab(tabParam);
      console.log(`Setting active tab to: ${tabParam}`);
    }
  }, [location.search]);

  // Mock user data - in a real app, this would come from your auth provider
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    profileImg: "",
  };

  // Mock brokerage accounts
  const brokerageAccounts = [
    { id: "broker-1", name: "TD Ameritrade", accountNumber: "****7890", connected: true },
    { id: "broker-2", name: "Robinhood", accountNumber: "****4321", connected: true },
  ];

  // Mock payment methods
  const paymentMethods = [
    { id: "card-1", type: "Visa", last4: "4242", expiryMonth: 12, expiryYear: 2025 },
    { id: "card-2", type: "Mastercard", last4: "8353", expiryMonth: 10, expiryYear: 2024 },
  ];

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    setCurrentTheme(newTheme);
    
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`,
      description: `The application theme has been changed to ${newTheme} mode.`,
    });
  };

  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };

  const handleRemovePaymentMethod = (id: string) => {
    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed successfully.",
    });
  };

  const handleDisconnectBrokerage = (id: string) => {
    toast({
      title: "Brokerage Disconnected",
      description: "Your brokerage account has been disconnected.",
    });
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container pt-24 pb-12">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackNavigation}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Account Settings</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="brokerage">Brokerage Accounts</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal information and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userData.profileImg} />
                      <AvatarFallback className="text-2xl">{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                  
                  <div className="flex-1 grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={userData.name} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={userData.email} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue={userData.phone} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="brokerage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Brokerage Accounts</CardTitle>
                <CardDescription>
                  Connect and manage your brokerage accounts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {brokerageAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">Account: {account.accountNumber}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDisconnectBrokerage(account.id)}
                    >
                      Disconnect
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Connect New Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods for investments and subscriptions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{method.type} •••• {method.last4}</p>
                        <p className="text-sm text-muted-foreground">
                          Expires: {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemovePaymentMethod(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {paymentMethods.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CreditCard className="mx-auto h-12 w-12 mb-2 opacity-50" />
                    <p>No payment methods added yet.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Payment Method
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the appearance of the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {currentTheme === 'dark' ? (
                        <MoonIcon className="h-5 w-5 text-primary" />
                      ) : (
                        <SunIcon className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark theme
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={currentTheme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserSettings;
