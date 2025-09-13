import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

const HeroSection = () => {

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
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto max-w-2xl lg:mx-0 self-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              <span className="block">Fashion Forward</span>
              <span className="block text-purple-600 dark:text-purple-400">
                Virtual Try-On
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-lg">
              Experience clothing like never before. See exactly how outfits look on you before buying with our revolutionary AR technology.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button onClick={() => handleTryOn(clothTryonParam)} size="lg" className="px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Try AR Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/products">
              <Button variant="outline" size="lg" className="px-8 py-6">
                Shop Collection
              </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center">
              <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium">New users get 15% off their first purchase</span>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            {/* AR visualization mockup */}
            <div className="relative w-[90%] md:w-[80%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-muted">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10" />
              
              {/* Phone frame overlay */}
              <div className="absolute inset-0 bg-black/5 rounded-2xl" />
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1/4 h-6 bg-black rounded-full"></div>
              
              {/* AR content representation */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative h-4/5 w-4/5 rounded-xl overflow-hidden bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  {/* Silhouette with clothing overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-4/5 w-2/5 bg-gray-300 dark:bg-gray-700 rounded-t-full"></div>
                    <div className="absolute bottom-0 h-1/2 w-3/5 bg-gradient-to-r from-purple-400 to-blue-400 opacity-70 rounded-t-lg"></div>
                  </div>
                  {/* AR elements */}
                  <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/80 dark:bg-white/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  </div>
                  {/* AR controls */}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-4/5 h-10 bg-white/80 dark:bg-white/20 rounded-full flex items-center justify-around px-4">
                    <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="mt-4 px-6 py-2 bg-black/10 dark:bg-white/10 rounded-full text-xs font-medium">
                  AR Mode Active
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;