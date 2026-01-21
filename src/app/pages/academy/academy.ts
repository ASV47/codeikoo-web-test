import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-academy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './academy.html',
  styleUrls: ['./academy.css']
})
export class Academy implements OnInit {

  courses = [
    {
      title: 'PYTHON',
      icon: 'fa-brands fa-python',
      color: '#3776AB',
      desc: 'أصبحت لغة Python شائعة بين مطوري الويب لأسباب عديدة. بساطتها وفرصها الواسعة تجعلها الخيار الأفضل للمبتدئين والمحترفين على حد سواء.'
    },
    {
      title: 'FRONT-END',
      icon: 'fa-solid fa-code',
      color: '#2546E0',
      desc: 'تعلم فن تحويل التصاميم إلى واقع ملموس. نغطي أحدث التقنيات مثل Angular و React لضمان بناء واجهات مستخدم احترافية وسريعة.'
    },
    {
      title: 'PHP',
      icon: 'fa-brands fa-php',
      color: '#777BB4',
      desc: 'اللغة الأساسية لتطوير الويب. تعلم كيفية بناء مواقع ديناميكية وقوية باستخدام PHP مع أفضل الممارسات البرمجية الحديثة.'
    }
  ];

  ngOnInit() {
    AOS.init({ duration: 1000, once: true });
  }
}
