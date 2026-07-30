import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ErwPipes from "./pages/products/ErwPipes";
import HollowSections from "./pages/products/HollowSections";
import SpiralPipes from "./pages/products/SpiralPipes";
import MsFittings from "./pages/products/MsFittings";
import MsFlanges from "./pages/products/MsFlanges";
import Updates from "./pages/Updates";
import UpdateDetail from "./pages/updates/UpdateDetail";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Jindal from "./pages/Jindal";
import Catalogue from "./pages/Catalogue";
import { resolvePageTitle } from "./hooks/usePageTitle";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const title = resolvePageTitle(location);
    document.title = `${title} | Navkar Tubes & Tools`;
  }, [location]);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/products"} component={Products} />
          <Route path={"/products/erw-pipes"} component={ErwPipes} />
          <Route path={"/products/ms-hollow-sections"} component={HollowSections} />
          <Route path={"/products/spiral-pipes"} component={SpiralPipes} />
          <Route path={"/products/ms-fittings"} component={MsFittings} />
          <Route path={"/products/ms-flanges"} component={MsFlanges} />
          <Route path={"/updates"} component={Updates} />
          <Route path={"/updates/:id"} component={UpdateDetail} />
          <Route path={"/gallery"} component={Gallery} />
          <Route path={"/contact"} component={Contact} />
          <Route path={"/about"} component={About} />
          <Route path={"/jindal"} component={Jindal} />
          <Route path={"/catalogue"} component={Catalogue} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Navigation />
          <Router />
          <Footer />
          <Toaster />
          <FloatingButtons />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
