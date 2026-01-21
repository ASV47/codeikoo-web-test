import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css']
})
export class Experience implements OnInit {

  // تقسيم الخبرات لمجموعات ليسهل عرضها
  techExpertise = [
    { title: 'تطوير الوجهات الأمامية', icon: 'fa-code' },
    { title: 'تطوير الوجهات الخلفية', icon: 'fa-server' },
    { title: 'تطوير تطبيقات الهاتف', icon: 'fa-mobile-screen' },
    { title: 'Microsoft Azure', icon: 'fa-cloud-arrow-up' },
    { title: 'حلول الخدمات المصغرة', icon: 'fa-cubes' },
    { title: 'اختبار الجودة والأمان', icon: 'fa-shield-halved' }
  ];

  specializedSoftware = [
    'CMS software', 'Odoo CRM', 'DevOps services',
    'IoT applications', 'Databases & Search',
    'Cloud Solutions', 'AI / ML services'
  ];

  marketingServices = [
    'Enterprise SEO Services', 'Google Local Ads',
    'Core Web Vitals Optimization', 'Social Media Advertising',
    'Social Media Management', 'Social Media Design'
  ];

  ngOnInit() {
    AOS.init({ duration: 1000, once: true });
  }
}
