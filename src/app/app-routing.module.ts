import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
	  loadChildren: () => import('../routes/home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'address',
	  loadChildren: () => import('../routes/address/address.module').then(m => m.AddressModule)
	},
	{
		path: 'login',
	  loadChildren: () => import('../routes/login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'otp-verify',
	  loadChildren: () => import('../routes/otp-verify/otp-verify.module').then(m => m.OtpVerifyModule)
	},
	{
		path: 'register',
	  loadChildren: () => import('../routes/register/register.module').then(m => m.RegisterModule)
	},
	{
		path: 'forgot-password',
	  loadChildren: () => import('../routes/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
	},
	{
		path: 'reset-password',
	  loadChildren: () => import('../routes/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
	},
	{
		path: 'change-password',
	  loadChildren: () => import('../routes/change-password/change-password.module').then(m => m.ChangePasswordModule)
	},
	{
		path: 'types',
	  loadChildren: () => import('../routes/type/type.module').then(m => m.TypeModule)
	},
	{
		path: 'flavours',
	  loadChildren: () => import('../routes/flavour/flavour.module').then(m => m.FlavourModule)
	},
	{
		path: 'occasions',
	  loadChildren: () => import('../routes/occasion/occasion.module').then(m => m.OccasionModule)
	},
	{
		path: 'products',
	  loadChildren: () => import('../routes/product/product.module').then(m => m.ProductModule)
	},
	{
		path: 'search',
	  loadChildren: () => import('../routes/product/product.module').then(m => m.ProductModule)
	},
	{
		path: 'prn',
	  loadChildren: () => import('../routes/product-detail/product-detail.module').then(m => m.ProductDetailModule)
	},
	{
		path: 'profile',
	  loadChildren: () => import('../routes/profile/profile.module').then(m => m.ProfileModule)
	},
	{
		path: 'change-language',
	  loadChildren: () => import('../routes/change-language/change-language.module').then(m => m.ChangeLanguageModule)
	},
	{
		path: 'carts',
	  loadChildren: () => import('../routes/cart/cart.module').then(m => m.CartModule)
	},
	{
		path: 'orders',
	  loadChildren: () => import('../routes/order/order.module').then(m => m.OrderModule)
	},
	{
		path: 'checkout',
	  loadChildren: () => import('../routes/checkout/checkout.module').then(m => m.CheckoutModule)
	},
	{
		path: 'order-success',
	  loadChildren: () => import('../routes/order-success/order-success.module').then(m => m.OrderSuccessModule)
	},
	{
		path: 'order-failed',
	  loadChildren: () => import('../routes/order-failed/order-failed.module').then(m => m.OrderFailedModule)
	},
	{
		path: 'pages',
	  loadChildren: () => import('../routes/page/page.module').then(m => m.PageModule)
	},
	{
		path: 'wishlist',
	  loadChildren: () => import('../routes/wishlist/wishlist.module').then(m => m.WishlistModule)
	},
];

@NgModule({
  imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabled',
			anchorScrolling: 'enabled',
			scrollPositionRestoration: 'enabled',
			relativeLinkResolution: 'legacy',
		}),
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
