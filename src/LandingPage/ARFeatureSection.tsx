import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Camera, CheckCircle } from "lucide-react";
import { useEffect } from "react";

const ARFeatureSection = () => {
  // Function to handle AR try-on
  const handleTryOn = (param: string) => {
    const url = `https://cdn.camweara.com/${param}`;
    console.log("Loading from : ", url);

    const body = document.getElementsByTagName("body")[0];
    const iframe = document.createElement("iframe");
    body.prepend(iframe);

    iframe.id = "iFrameID";
    iframe.allow = "camera";
    Object.assign(iframe.style, {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      marginLeft: "0",
      marginTop: "0",
      zIndex: "9999",
      border: "none"
    });

    iframe.setAttribute("src", url);
    window.document.body.style.overflow = "hidden";
  };

  // Add event listener for iframe close message
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "closeIframe") {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        const iframe = document.getElementById("iFrameID");
        if (iframe) {
          iframe.setAttribute("src", "");
          iframe.style.display = "none";
          iframe.remove();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // The clothing try-on parameter
  const clothTryonParam = "clothing_virtual_tryon/?skus=puff_jacket_pink_2,morroccan_shirt_1,black_jacket_2,green_hoodie2,redrum_shirt_1,skull_tshirt_1&company_name=demo_store&temp=253636";

  return (
    <section className="relative py-20 px-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-purple-50 dark:bg-purple-950/10" aria-hidden="true" />
      <div
        className="absolute right-0 bottom-0 -mb-20 -mr-20 w-80 h-80 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-70"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-0 -mt-20 -ml-20 w-80 h-80 rounded-full bg-purple-100 dark:bg-purple-900/20 blur-3xl opacity-70"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Revolutionary <span className="text-purple-600 dark:text-purple-400">AR Try-On</span> Technology
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              See exactly how clothing fits your body with our state-of-the-art augmented reality. No more guessing if something will look good on you.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Perfect Fit Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AR technology uses precise body measurements to show exactly how garments will fit your unique shape.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Mix and Match Outfits</h3>
                  <p className="text-sm text-muted-foreground">
                    Try different combinations of clothing items to create complete looks before purchasing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Share with Friends</h3>
                  <p className="text-sm text-muted-foreground">
                    Send your virtual try-on to friends and family to get their opinion before making a purchase.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                className="gap-2 bg-purple-600 hover:bg-purple-700"
                onClick={() => handleTryOn(clothTryonParam)}
              >
                <span className="text-white">Try AR Experience</span><ArrowRight className="h-4 w-4 text-white" />
              </Button>
              <Button variant="outline" className="gap-2">
                How It Works <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* AR Technology Visual */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Phone mockup with AR */}
              <div className="relative border-8 border-gray-800 dark:border-gray-700 rounded-3xl overflow-hidden shadow-xl bg-gray-800">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 z-20"></div>

                {/* AR Screen Content */}
                <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 overflow-hidden">
                  {/* Virtual person silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-4/5 w-1/2 bg-gray-300/50 dark:bg-gray-600/50 rounded-t-full"></div>
                  </div>

                  {/* Virtual clothes overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-3/5 w-3/5">
                      <div className="absolute top-0 left-0 right-0 h-2/5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-t-lg transform translate-y-4"></div>
                      <div className="absolute bottom-0 left-0 right-0 top-1/4 bg-blue-500/20 rounded-b-lg"></div>
                    </div>
                  </div>

                  {/* AR Interface Elements */}
                  <div className="absolute top-4 left-4 bg-white/80 dark:bg-black/50 rounded-full p-2">
                    <Camera className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>

                  <div className="absolute bottom-6 inset-x-6">
                    <div className="bg-white/80 dark:bg-black/60 rounded-xl p-3 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-medium">Denim Jacket</div>
                        <div className="text-xs font-bold">$59.99</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                        <div className="w-6 h-6 rounded-full bg-gray-500"></div>
                        <div className="w-6 h-6 rounded-full bg-black"></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div className="text-xs">Size: M</div>
                        <div className="text-purple-600 dark:text-purple-400 text-xs font-medium">See more ›</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 bg-purple-600 text-white rounded-full">
                    AR ACTIVE
                  </div>
                </div>

                {/* Home button */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-gray-600 rounded-full"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-300 dark:bg-purple-900/40 rounded-full filter blur-xl opacity-70"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-300 dark:bg-blue-900/40 rounded-full filter blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARFeatureSection;