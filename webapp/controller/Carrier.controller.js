sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("fullscreen.equate.comFullscreenPrj.controller.Carrier", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf fullscreen.equate.comFullscreenPrj.view.Carrier
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf fullscreen.equate.comFullscreenPrj.view.Carrier
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf fullscreen.equate.comFullscreenPrj.view.Carrier
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf fullscreen.equate.comFullscreenPrj.view.Carrier
		 */
		//	onExit: function() {
		//
		//	}
		
			onInit: function() {
		var oRouter = this.getRouter();
		oRouter.getRoute("carrier").attachMatched(this._onObjectMatched, this);
	},

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	_onObjectMatched: function(oEvent) {
		var oArgs, oView;
		oArgs = oEvent.getParameter("arguments");
		this._sCarrierId = oArgs.carrierId;
		oView = this.getView();

		oView.bindElement({
			path: "travel>/CarrierSet('" + this._sCarrierId + "')",
			events: {
				change: this._onBindingChange.bind(this),
				dataRequested: function() {
					oView.setBusy(true);
				},
				dataReceived: function() {
					oView.setBusy(false);
				}
			}
		});
	},

	_onBindingChange: function() {
		var oElementBinding;

		oElementBinding = this.getView().getElementBinding("travel");

		// No data for the binding
		if (oElementBinding && !oElementBinding.getBoundContext()) {
			this.getRouter().getTargets().display("notFound");
		}
	},

	onNavBack: function() {
		var oHistory, sPreviousHash, oRouter;

		oHistory = sap.ui.core.routing.History.getInstance();
		sPreviousHash = oHistory.getPreviousHash();

		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			oRouter = this.getRouter();
			oRouter.navTo("overview", true /*no history*/ );
		}
	}
		

	});

});