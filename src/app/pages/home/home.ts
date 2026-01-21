import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  // بيانات الخدمات
  services = [
    { title: 'تطوير مواقع الويب', desc: 'نطاق الواجهة الأمامية والبرمجه الخلفية وقاعدة البيانات بأحدث المعايير لتزدهر في العصر الرقمي.' },
    { title: 'تطوير تطبيقات الجوال', desc: 'من التصميم إلى التطوير والدعم المستمر. نبنيها خصيصا من الصفر لتحويل فكرتك الي تحفة رقمية.' },
    { title: 'حلول التصميم', desc: 'ينشئ مصممو UI / UX لدينا مفاهيم هوية العلامة التجارية ونماذج أولية وواجهات رائعة.' },
    { title: 'استشارات تقنية', desc: 'تحليل مشروعك بعمق ودراسة المنافسين، وصياغة هيكله واختيار التكنولوجيا المناسبه.' },
    { title: 'SEO & Marketing', desc: 'يمكن للعملاء دائمًا الاعتماد على خبرائنا في مجالات التحليل والتخطيط والدعاية.' },
    { title: 'ضمان الجودة', desc: 'يقدم متخصصو ضمان الجودة لدينا اختبارات آلية ويدوية للتأكد من أن البرامج خالية من العيوب.' }
  ];

  // تقنيات السلايدر
  technologies = ['Angular 20', 'Node.js', 'Flutter', 'React Native', 'AWS', 'Python', 'UI/UX', 'Docker', 'Firebase'];

  // فورم التواصل
  contact = { name: '', email: '', message: '' };

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }

  onSubmit() {
    console.log('Form Data:', this.contact);
    alert('تم استلام رسالتك بنجاح في CodeLink!');
  }
}
