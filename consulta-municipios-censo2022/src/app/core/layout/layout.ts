import { Component } from '@angular/core';
import { Header } from './header/header';
import { Aside } from './aside/aside';
import { Main } from './main/main';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Header, Aside, Main, Footer, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
