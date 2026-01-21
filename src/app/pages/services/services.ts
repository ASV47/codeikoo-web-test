import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class Services implements OnInit {

  services = [
    {
      title: 'تطوير مواقع الويب',
      desc: 'نقوم بتطوير مواقع الويب من قبل مطوري الويب الخبراء لدينا. يتم تصميم نطاق الواجهة الأمامية والبرمجة الخلفية وقاعدة البيانات واختيار الخادم المناسب ليلائم سير عملك.',
      icon: 'fa-solid fa-code'
    },
    {
      title: 'تطوير تطبيقات الجوال',
      desc: 'تطوير تطبيقات الهاتف المحمول من التصميم إلى التطوير والدعم المستمر. نبنيها خصيصاً من الصفر لتحويل فكرتك إلى تحفة رقمية سلسة.',
      icon: 'fa-solid fa-mobile-screen-button'
    },
    {
      title: 'حلول التصميم والعلامات التجارية',
      desc: 'ينشئ مصممو UI / UX لدينا مفاهيم هوية العلامة التجارية ونماذج أولية وواجهات رائعة ممتعة للعين وسهلة الاستخدام.',
      icon: 'fa-solid fa-wand-magic-sparkles'
    },
    {
      title: 'استشارات تكنولوجيا المعلومات',
      desc: 'نساعدك في تحليل مشروعك بعمق ودراسة المنافسين، وصياغة هيكله واقتراح أفضل الحلول والتقنيات المناسبة.',
      icon: 'fa-solid fa-lightbulb'
    },
    {
      title: 'SEO & Social Media Marketing',
      desc: 'تحليل الأعمال والتخطيط والدعاية والإعلان لضمان وصول منتجك لجمهورك المستهدف بكفاءة عالية.',
      icon: 'fa-solid fa-chart-line'
    },
    {
      title: 'ضمان الجودة',
      desc: 'يقدم متخصصو ضمان الجودة لدينا اختبارات آلية ويدوية للتأكد من أن البرامج التي تم إنشاؤها خالية من العيوب.',
      icon: 'fa-solid fa-shield-check'
    }
  ];

  steps = [
  { id: '01', title: 'فكرة', icon: 'fa-lightbulb' },
  { id: '02', title: 'نخطط', icon: 'fa-map-location-dot' },
  { id: '03', title: 'نطور', icon: 'fa-laptop-code' },
  { id: '04', title: 'نختبر', icon: 'fa-vial-circle-check' },
  { id: '05', title: 'نطلق', icon: 'fa-rocket' },
  { id: '06', title: 'ندعمك', icon: 'fa-headset' }
];
  testimonials = [
    { name: 'اسم العميل', job: 'مسمى وظيفي', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quam cumque quae iusto.' },
    { name: 'اسم العميل', job: 'مسمى وظيفي', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quam cumque quae iusto.' },
    { name: 'اسم العميل', job: 'مسمى وظيفي', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quam cumque quae iusto.' }
  ];

  ngOnInit() {
    AOS.init({ duration: 1000, once: true });
  }
}
