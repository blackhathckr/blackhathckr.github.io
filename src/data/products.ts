import whiteT from "@/assets/images/whiteT.jpeg"
import blackT from "@/assets/images/blackT.jpg";
import blackPants from "@/assets/images/pants.jpeg";
import rolex from '@/assets/deepar/rolex.jpg';
import nike from '@/assets/deepar/shoes.jpg';
import sunglasses from '@/assets/deepar/sunglasses.jpg';
import sweater from '@/assets/deepar/sweater.jpg';
import jacket from '@/assets/deepar/greenjacket.jpg';
import scarf from '@/assets/deepar/greenscarfs.jpg';

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  modelPath: string;
  category: 'tshirt' | 'pants' | 'watch' | 'sunglasses' | 'shoes' | 'clothing' | 'accessory';
  modelConfig: {
    position: [number, number, number];
    scale: [number, number, number];
  };
  arConfig?: {
    uid: string;
    arType: 'wearable' | 'accessory';
    trackingPoints: string[];
    modelMetrics: {
      vertices: number;
      polygons: number;
      textures: string[];
    };
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: "Rolex",
    image: rolex,
    description: "Premium luxury watch with AR fitting",
    price: 799.99,
    modelPath: "/models/accessories/watch.glb",
    category: 'watch',
    modelConfig: {
      position: [0, 0, -2],
      scale: [1, 1, 1]
    },
    arConfig: {
      uid: 'WATCH',
      arType: 'wearable',
      trackingPoints: ['wrist'],
      modelMetrics: {
        vertices: 2400,
        polygons: 1200,
        textures: ['diffuse', 'normal']
      }
    }
  },
  {
    id: 2,
    name: "Nike Shoes",
    image: nike,
    description: "High-performance athletic shoes",
    price: 129.99,
    modelPath: "/models/shoes/sneakers.glb",
    category: 'shoes',
    modelConfig: {
      position: [0, 0, -2],
      scale: [1, 1, 1]
    },
    arConfig: {
      uid: 'SHOES',
      arType: 'wearable',
      trackingPoints: ['feet'],
      modelMetrics: {
        vertices: 3600,
        polygons: 1800,
        textures: ['diffuse', 'normal', 'roughness']
      }
    }
  },
  {
    id: 3,
    name: "Classic Sunglasses",
    image: sunglasses,
    description: "Stylish sunglasses with UV protection",
    price: 79.99,
    modelPath: "/models/accessories/sunglasses.glb",
    category: 'sunglasses',
    modelConfig: {
      position: [0, 0, -2],
      scale: [0.5, 0.5, 0.5]
    },
    arConfig: {
      uid: 'GLASSES',
      arType: 'wearable',
      trackingPoints: ['face'],
      modelMetrics: {
        vertices: 1800,
        polygons: 900,
        textures: ['diffuse', 'specular']
      }
    }
  },
  {
    id: 4,
    name: "Green Party Jacket",
    image: jacket,
    description: "Stylish green jacket for any occasion",
    price: 149.99,
    modelPath: "/models/clothing/jacket.glb",
    category: 'clothing',
    modelConfig: {
      position: [0, 0, -2],
      scale: [1, 1, 1]
    },
    arConfig: {
      uid: 'JACKET',
      arType: 'wearable',
      trackingPoints: ['shoulders', 'torso'],
      modelMetrics: {
        vertices: 4200,
        polygons: 2100,
        textures: ['diffuse', 'normal', 'roughness']
      }
    }
  },
  {
    id: 5,
    name: "Elegant Scarf",
    image: scarf,
    description: "Soft and warm scarf for cold weather",
    price: 39.99,
    modelPath: "/models/accessories/scarf.glb",
    category: 'accessory',
    modelConfig: {
      position: [0, 0, -2],
      scale: [0.8, 0.8, 0.8]
    },
    arConfig: {
      uid: 'SCARF',
      arType: 'wearable',
      trackingPoints: ['neck', 'shoulders'],
      modelMetrics: {
        vertices: 1600,
        polygons: 800,
        textures: ['diffuse', 'normal']
      }
    }
  },
  {
    id: 6,
    name: "Gucci Sweater",
    image: sweater,
    description: "Luxury designer sweater with premium comfort",
    price: 249.99,
    modelPath: "/models/clothing/sweater.glb",
    category: 'clothing',
    modelConfig: {
      position: [0, 0, -2],
      scale: [1, 1, 1]
    },
    arConfig: {
      uid: 'SWEATER',
      arType: 'wearable',
      trackingPoints: ['torso', 'arms'],
      modelMetrics: {
        vertices: 3800,
        polygons: 1900,
        textures: ['diffuse', 'normal', 'roughness']
      }
    }
  }
];