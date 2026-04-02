import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { toast } from '../hooks/use-toast';
import { 
  Settings, 
  Store, 
  Users, 
  Mail, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Palette,
  CreditCard,
  Truck,
  MessageCircle,
  Save,
  RefreshCw
} from 'lucide-react';

const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Store Settings State
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Salad Karo - Fresh Bites',
    storeDescription: 'Fresh, healthy, and delicious salads delivered to your doorstep',
    storeEmail: 'contact@saladkaro.com',
    storePhone: '+1 (555) 123-4567',
    address: '123 Healthy Street, Fresh City, FC 12345',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    taxRate: '8.5'
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderUpdates: true,
    newUserRegistrations: true,
    lowStock: true,
    dailyReports: false,
    weeklyReports: true,
    monthlyReports: true
  });

  // Security Settings State
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5',
    adminApproval: true
  });

  // Payment Settings State
  const [payment, setPayment] = useState({
    paypalEnabled: true,
    stripeEnabled: true,
    codEnabled: true,
    minimumOrder: '25',
    freeDelivery: '50',
    deliveryFee: '5'
  });

  const handleSaveSettings = async (category: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Settings Updated",
        description: `${category} settings have been saved successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout currentPage="settings">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Settings className="h-8 w-8 text-green-600" />
              Admin Settings
            </h1>
            <p className="text-gray-600 mt-2">Manage your store configuration and preferences</p>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
            <TabsTrigger value="store" className="flex items-center gap-2 py-3">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Store</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 py-3">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 py-3">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2 py-3">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex items-center gap-2 py-3">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Delivery</span>
            </TabsTrigger>
          </TabsList>

          {/* Store Settings */}
          <TabsContent value="store" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-green-600" />
                  Store Information
                </CardTitle>
                <CardDescription>
                  Configure your store's basic information and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input
                      id="storeName"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Store Email</Label>
                    <Input
                      id="storeEmail"
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Store Phone</Label>
                    <Input
                      id="storePhone"
                      value={storeSettings.storePhone}
                      onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={storeSettings.currency} onValueChange={(value) => setStoreSettings({...storeSettings, currency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Store Description</Label>
                  <Textarea
                    id="storeDescription"
                    value={storeSettings.storeDescription}
                    onChange={(e) => setStoreSettings({...storeSettings, storeDescription: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Store Address</Label>
                  <Textarea
                    id="address"
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                    rows={2}
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('Store')}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-green-600" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div className="space-y-0.5">
                        <Label className="text-base capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <p className="text-sm text-gray-500">
                          {key === 'emailNotifications' && 'Receive notifications via email'}
                          {key === 'orderUpdates' && 'Get notified about new orders and status changes'}
                          {key === 'newUserRegistrations' && 'Alert when new users register'}
                          {key === 'lowStock' && 'Warning when product inventory is low'}
                          {key === 'dailyReports' && 'Daily summary of sales and activities'}
                          {key === 'weeklyReports' && 'Weekly analytics and performance reports'}
                          {key === 'monthlyReports' && 'Monthly business insights and trends'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => setNotifications({...notifications, [key]: checked})}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('Notification')}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Security & Access Control
                </CardTitle>
                <CardDescription>
                  Manage security settings and access permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={security.passwordExpiry}
                      onChange={(e) => setSecurity({...security, passwordExpiry: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={security.loginAttempts}
                      onChange={(e) => setSecurity({...security, loginAttempts: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to admin accounts</p>
                    </div>
                    <Switch
                      checked={security.twoFactorAuth}
                      onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Admin Approval Required</Label>
                      <p className="text-sm text-gray-500">New admin users require approval</p>
                    </div>
                    <Switch
                      checked={security.adminApproval}
                      onCheckedChange={(checked) => setSecurity({...security, adminApproval: checked})}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('Security')}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  Payment & Pricing
                </CardTitle>
                <CardDescription>
                  Configure payment methods and pricing settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">PP</span>
                        </div>
                        <div>
                          <Label className="text-base">PayPal</Label>
                          <p className="text-sm text-gray-500">Accept PayPal payments</p>
                        </div>
                      </div>
                      <Switch
                        checked={payment.paypalEnabled}
                        onCheckedChange={(checked) => setPayment({...payment, paypalEnabled: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-purple-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <div>
                          <Label className="text-base">Stripe</Label>
                          <p className="text-sm text-gray-500">Accept credit/debit cards via Stripe</p>
                        </div>
                      </div>
                      <Switch
                        checked={payment.stripeEnabled}
                        onCheckedChange={(checked) => setPayment({...payment, stripeEnabled: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-green-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">COD</span>
                        </div>
                        <div>
                          <Label className="text-base">Cash on Delivery</Label>
                          <p className="text-sm text-gray-500">Allow payment upon delivery</p>
                        </div>
                      </div>
                      <Switch
                        checked={payment.codEnabled}
                        onCheckedChange={(checked) => setPayment({...payment, codEnabled: checked})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="minimumOrder">Minimum Order ($)</Label>
                    <Input
                      id="minimumOrder"
                      type="number"
                      value={payment.minimumOrder}
                      onChange={(e) => setPayment({...payment, minimumOrder: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="freeDelivery">Free Delivery Above ($)</Label>
                    <Input
                      id="freeDelivery"
                      type="number"
                      value={payment.freeDelivery}
                      onChange={(e) => setPayment({...payment, freeDelivery: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
                    <Input
                      id="deliveryFee"
                      type="number"
                      value={payment.deliveryFee}
                      onChange={(e) => setPayment({...payment, deliveryFee: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('Payment')}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Settings */}
          <TabsContent value="delivery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  Delivery & Logistics
                </CardTitle>
                <CardDescription>
                  Manage delivery zones, timing, and logistics settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4 border-green-200 bg-green-50">
                    <h4 className="font-semibold text-green-800 mb-2">Delivery Zones</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Zone 1 (0-5 km)</span>
                        <Badge variant="secondary">$3.00</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Zone 2 (5-10 km)</span>
                        <Badge variant="secondary">$5.00</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Zone 3 (10-15 km)</span>
                        <Badge variant="secondary">$7.00</Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-blue-200 bg-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2">Delivery Times</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Standard</span>
                        <Badge variant="outline">30-45 min</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Express</span>
                        <Badge variant="outline">15-30 min</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Scheduled</span>
                        <Badge variant="outline">Custom</Badge>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Operating Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Monday - Friday</Label>
                      <div className="flex gap-2">
                        <Input placeholder="09:00" />
                        <span className="flex items-center">to</span>
                        <Input placeholder="22:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Saturday - Sunday</Label>
                      <div className="flex gap-2">
                        <Input placeholder="10:00" />
                        <span className="flex items-center">to</span>
                        <Input placeholder="23:00" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('Delivery')}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;