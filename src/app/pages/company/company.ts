import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import AOS from 'aos'; // تأكدي من استيراد AOS هنا
@Component({
  selector: 'app-company',
imports: [CommonModule, RouterModule],
  templateUrl: './company.html',
  styleUrl: './company.css',
})
export class Company implements OnInit {

  cultureValues = [
    {
      title: 'المرونة',
      description: 'بدون شك، المرونة مهمة! إنها تساعد على تحقيق نجاح أكبر وتمنحنا القدرة على إنشاء برامج الويب والجوال بأعلى جودة ممكنة. المرونة تسمح لنا بالوصول إلى آفاق جديدة من الجودة مع كل تحدٍ جديد.',
      points: ['Agile Approach', 'Dedicated team', 'Constant Communication', 'CI/CD Practices', 'Quality Support']
    },
    {
      title: 'الشفافية',
      description: 'الشفافية في العمل على المشاريع هي ما يجعلنا أحد أكثر موفري الحلول الموثوق بهم. نعتقد أن هذا النهج هو الطريقة الوحيدة لزيادة كفاءة التعاون المتبادل. يمنح هذا النهج العملاء فرصة للمشاركة في جميع مراحل تطوير منتجاتهم.',
      points: ['Focus on Details', 'Knowledge Sharing', 'Strong Connections', 'Security & Safety', 'Instant Assistance']
    }
  ];

  achievements = [
    { count: '167+', text: 'تطوير مواقع الويب' },
    { count: '638+', text: 'SEO & Social Media Marketing' },
    { count: '85+', text: 'تطوير تطبيقات الجوال' },
    { count: '4+', text: 'IoT applications' },
    { count: '125+', text: 'حلول التصميم والعلامات التجارية' },
    { count: '51+', text: 'Odoo CRM' },
    { count: '218+', text: 'إنشاء العلامة التجارية' },
    { count: '7+', text: 'DevOps Services' }
  ];

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }
}
