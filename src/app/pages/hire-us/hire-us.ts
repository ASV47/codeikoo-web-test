import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-hire-us',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './hire-us.html',
  styleUrls: ['./hire-us.css']
})
export class HireUs implements OnInit {
  formData = {
    name: '',
    email: '',
    service: '',
    message: '',
    agreed: false
  };

  services = ['تطوير ويب', 'تطبيقات جوال', 'تصميم هوية', 'استشارات تقنية', 'تسويق رقمي'];

  ngOnInit() {
    AOS.init({ duration: 1000, once: true });
  }

  submitForm() {
    if (this.formData.agreed) {
      console.log('Hire Us Data:', this.formData);
      alert('تم إرسال طلبك بنجاح! سيتواصل معك فريق كود لينك قريباً.');
    } else {
      alert('يرجى الموافقة على الشروط والأحكام أولاً.');
    }
  }
}
