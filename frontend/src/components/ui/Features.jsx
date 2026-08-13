import React from "react";
import { Truck, Shield, Headphones } from "lucide-react";

const Features = () => {
  return (
    <section className="py-10 md:py-12 bg-muted/50 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">

          {/* Free Shipping */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-muted-foreground text-sm sm:text-base">On orders over $50</p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-muted-foreground text-sm sm:text-base">100% secure transactions</p>
            </div>
          </div>

          {/* Support */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 bg-purple-100 rounded-full flex items-center justify-center">
              <Headphones className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Always here to help</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;