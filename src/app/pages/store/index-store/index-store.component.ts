import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


interface Shop {
  name: string;
  description: string;
  image: string;
  location: string;
  category: string;
  url: string;
}

@Component({
  selector: 'app-index-store',
  imports: [CommonModule],
  templateUrl: './index-store.component.html',
  styleUrl: './index-store.component.scss'
})
export class IndexStoreComponent {

      shops: Shop[] = [
    {
      name: 'Tienda Tech',
      description: '¡Lo último en tecnología y gadgets!',
      image: 'https://images.unsplash.com/photo-1515165562835-cbdf6d876004?w=400',
      location: 'Madrid, España',
      category: 'Tecnología',
      url: '#'
    },
    {
      name: 'Book Lovers',
      description: 'Tu librería favorita con envíos a todo el país.',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
      location: 'Barcelona, España',
      category: 'Libros',
      url: '#'
    },
    {
      name: 'Fitness Store',
      description: 'Todo lo que necesitas para estar en forma.',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      location: 'Valencia, España',
      category: 'Deportes',
      url: '#'
    },
    {
      name: 'Moda Urbana',
      description: 'Ropa y accesorios urbanos a la moda.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      location: 'Sevilla, España',
      category: 'Moda',
      url: '#'
    }
  ];
}
