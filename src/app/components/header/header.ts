import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // لجعل الصعود ناعماً وليس مفاجئاً
  });
  this.isMobileMenuOpen = false; // لإغلاق القائمة في الموبايل أيضاً عند الضغط
}
  isScrolled = false;
  isMobileMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // تفعيل الكلاس "scrolled" بمجرد نزول الصفحة 50 بكسل
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
