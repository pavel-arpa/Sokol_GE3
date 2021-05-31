'use strict'







class Content {
  name
  title
  text
  images = []
  audio = []
  video = []
  buttons = []

  constructor({name, title, text, images, audio, video, buttons}) {
    this.name = name
    this.title = title
    this.text = text
    this.images = images
    this.video = video
    this.audio = audio
    this.buttons = buttons
  }
}






class Manipulator {
  $workspace
  $action
  $title
  $content
  btnl
  pageContents = []
  counter = true

  constructor() {
    document.body.insertAdjacentHTML('afterend', `
      <main class="wrapper">
        <div class="wrapper__slide">
        </div>
      </main>
    `)
    this.$workspace = document.querySelector('.wrapper__slide')
  }


  pushContent(c) {
    this.pageContents.push(c)
  }


  gen(i) {
    let c = this.pageContents
    this.addTitle(c[i].title)
    this.addContent()
    this.addText(c[i].text)
    if (c[i].images) {
      c[i].images.forEach(item => {
        this.addImg({src: item.src, url: item.url})
      })
    }
    if (c[i].audio) {
      c[i].audio.forEach(item => {
        this.addAudio({src: item.src, author: item.author})
      })
    }
    if (c[i].video) {
      c[i].video.forEach(item => {
        this.addVideo({src: item.src, author: item.author})
      })
    }
    this.addButtonSection(c[i].buttons.title)
    c[i].buttons.btns.forEach(item => {
      this.addButton({text: item.text, ref: item.ref, src: item.src})
    })
  }


  go(ref) {
    this.counter = true
    this.pageContents.forEach(el => {
      if(el.name == ref) {
        el.title ? this.changeTitle(el.title) : null
        el.text ? this.changeText(el.text) : null
        el.images 
          ? el.images.forEach(item => {
              this.removeImgs()
              this.addImg({src: item.src, url: item.url})
            }) 
          : this.removeImgs()
        el.audio
          ? el.audio.forEach(item => {
            this.addAudio({src: item.src, author: item.author})
          })
          : this.removeAudio()
        el.video
          ? el.video.forEach(item => {
            this.addVideo({src: item.src, author: item.author})
            console.log(0);
          })
          : this.removeVideo()
        this.removeButtons()
        el.buttons.btns.forEach(item => {
          this.addButton({text: item.text, ref: item.ref, src: item.src})
        })
      }
    })
  }


  getPage() {
    return this.$workspace
  }


  addTitle(title) {
    this.$workspace.insertAdjacentHTML('afterbegin', `
      <h1 class="title">${title}</h1>
    `)
    this.$title = document.querySelector('.title')
  }
  changeTitle(title) {
    this.$title.innerText = title
  }


  addContent() {
    this.$workspace.insertAdjacentHTML('beforeend', `
      <div class="content"></div>
    `)
    this.$content = this.$workspace.querySelector('.content')
  }


  addText(text) {
    this.$content.insertAdjacentHTML('beforeend', `
      <p class="content__text">${text}</p>
    `)
  }
  changeText(text) {
    this.$content.querySelector('.content__text').innerHTML = text
  }


  addImg({src, url}) {
    this.$content.insertAdjacentHTML('beforeend', `
      <img src="${src}" alt="${url}" class="content__image">
    `)
  }
  removeImgs() {
    Array.from(this.$content.querySelectorAll('.content__image')).map(item => {
      item.remove()
    })
  }



  addAudio({src, author}) {
    if(this.counter) {
      this.$content.insertAdjacentHTML('afterend', `
        <div class="wrapper-audio">
          <audio class="audio" controls autoplay>
            <source src="${src}">
          </audio>
          <i>${author}</i>
        </div>
      `)
    }
  }
  removeAudio() {
    Array.from(this.$workspace.querySelectorAll('.wrapper-audio')).map(item => {
      item.remove()
    })
  }


  addVideo({src, author}) {
    if(this.counter) {
      this.$content.insertAdjacentHTML('afterend', `
        <div class="video-wrapper">
          <video controls="controls" class="video">
            <source src="${src}">
          </video>
          <i>${author}</i>
        </div>
      `)
    }
  }
  removeVideo() {
    Array.from(this.$workspace.querySelectorAll('.video-wrapper')).map(item => {
      item.remove()
    })
  }


  addButtonSection(title) {
    this.$workspace.insertAdjacentHTML('beforeend', `
      <div class="action">
        <span class="action__title">${title}</span>
      </div>
    `)
    this.$action = this.$workspace.querySelector('.action')
  }


  addButton({text, ref, src}) {
    this.$action.insertAdjacentHTML('beforeend', `
      <div class="action__button-wrapper">
        <a ${src ? ('href="' + src + '"') : ''} class="action__button">${text}</a><span class="action__arrow">></span>
      </div>
    `)
    let arr = this.$workspace.querySelectorAll('.action__button')
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // код для мобильных устройств
      arr[arr.length - 1].addEventListener('touchend', (e) => {
        if(this.counter) {
          this.counter = false
          setTimeout(() => {
            this.go(ref)
          }, 500)
        }
      })
    } else {
      arr[arr.length - 1].addEventListener('click', (e) => {
        this.go(ref)
      })
  }
  }
  removeButtons() {
    Array.from(this.$workspace.querySelectorAll('.action__button-wrapper')).map(node => {
      node.remove()
    })
  }
}







document.addEventListener('DOMContentLoaded', () => {
  
  let mplt = new Manipulator()


  let index = new Content({
    name: 'index',
    title: 'Предыстория',
    text: `
2025 год - человечеству стал доступен квантовый компьютер от одной из крупнейших компаний.<br/>
2030 год - первая посадка на Марс благодаря мощности современных вычислительных машин. <br/>
2059 год - человек впервые зашел за пределы Солнечной системы<br/>
2070... Вопрос об уничтожении МКС
    `,
    images: [
      {
        src: './img/index.jpg',
        url: 'https://poisknews.ru/news/astropchely-dlya-astronavtov-nasa-poslet-na-mks-robotov/',
      },
    ],
    audio: [
      {
        src: './audio/true-north.mp3',
        author: 'Trevor Kowalski - True North',
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'дальше',
          ref: 'meeting'
        },
      ]
    }
  })


  let meeting = new Content({
    name: 'meeting',
    title: 'Заседание',
    text: `
- Наша станция может и должна еще служить человечеству, генерал Старкс. Коллектив ученых работает там уже десятки лет<br>
- Проще тоже самое делать либо с Марса, либо с Земли<br>
- Однозначно, генерал Старкс<br>
...<br>
В 2071 году МКС частично была разобрана и доработана современными модулями с 37 стран. Новое название станции - 
EXPO Station<br>
...<br>
Самые передовые разработки осуществлялись всеми странами. России выпала роль разработки некоторых модулей и корпуса суперскоростных кораблей
    `,
    images: [
      {
        src: './img/meeting.png',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'начать действовать',
          ref: 'start'
        },
        {
          text: 'а что было дальше с МКС?',
          ref: 'mks'
        },
      ]
    }
  })


  let start = new Content({
    name: 'start',
    title: 'Стартуем!',
    text: `
    В 2347 году было решено отправить экспедицию к краю Млечного Пути.
    Российский Sokol GE3 был назначен флагманским кораблем, на котором и совершится экспедиция.
    <br>...<br>
    - Хэй, Николсон, что будешь делать, когда вернёшься?<br>
    - Думаю, что предложат преподавать в университете. Туда и пойду<br>
    - Скучный ты. Борис, а ты?<br>
    - Создам новую... Ладно, уже стартуем.
    3... 2... 1...
    `,
    images: [
      {
        src: './img/start.png',
        url: ''
      }
    ],
    video: [
      {
        src: './videos/start.mp4',
        author: 'Источник: https://www.kinopoisk.ru/film/258687/'
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'полный вперед!',
          ref: 'firstProblem'
        },
        {
          text: 'Sokol GE3',
          ref: 'sokol'
        },
      ]
    }
  })


  let mks = new Content({
    name: 'mks',
    title: 'МКС',
    text: `
    За 20 лет вес EXPO увеличился с 400 тонн до 25 000 тонн. А в 2300 году итоговая масса составила 13 млн тонн, став вторым спутником Земли
    <br>...<br>
    Встречи с другими расами не произошло
    <br>...<br>
    EXPO обладает 12-ю портами для легких кораблей, 38 двигателями и 3-мя телескопами
    <br>...<br>
    Население EXPO - 300 человек
    <br>...<br>
    Имеет в себе несколько тепличных комплексов и молекулярных ферм
    `,
    images: [
      {
        src: './img/mks.png',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'старт',
          ref: 'start'
        },
      ]
    }
  })


  let firstProblem = new Content({
    name: 'firstProblem',
    title: '300 градусов',
    text: `
    На скорости 2600 св.лет / ч вы мчитесь к краю Галактики.
    <br>...<br>
    Задремав через 10 часов полета, вы просыпаетесь от чувства жара. Командир корабля просит вас проверить, что случилось на верхней палубе. Вы попадаете наверх и видите красную от температуры трубу, а на датчике:
    <br>--- температура узла: 300 C
    <br>--- норма: 45 С
    <br>...
    <br>Вы продолжаете искать поломку и находите в конце коридора блок регуляции температуры в корабле:
    <br>--- Предупреждение: сбой в системе - резкий нагрев Варп-двигателей
    `,
    images: [
      {
        src: './img/first-problem.jpg',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'исправить программно',
          ref: 'program'
        },
        {
          text: 'идти к отсеку с двигателями',
          ref: 'engine'
        },
        {
          text: 'быстро вернуться и закрыть кран на трубе',
          ref: 'pipe'
        },
      ]
    }
  })

  
  let sokol = new Content({
    name: 'sokol',
    title: '300 градусов',
    text: `
    Корабль России, Германии и Китая. Может поместить на борту 20 человек и обеспечивать их жизнедеятельность на протяжении 50 дней. 
    В комплекте есть спасательный Суперджет
    <br>...<br>
    Корабль оснащен 10-ю Варп-двигателями: 5 спереди и 5 сзади
    <br>...<br>
    Имеет на борту дронов-анализаторов, шахтерские инструменты, внедорожник с усилением веса для различных гравитаций
    <br>...<br>
    Максимальная скорость - 3700 св.лет/ч за счет искажения пространства методом изменения показателей массы
    `,
    images: [
      {
        src: './img/sokol.jpg',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'полный вперед!',
          ref: 'firstProblem'
        },
      ]
    } 
  })


  let program = new Content({
    name: 'program',
    title: 'Ошибка блока регуляции',
    text: `
    Программное обеспечение блока выдает ошибку: программа отработала 10 часов вместо 25 и была выключена
    `,
    images: [
      {
        src: './img/program.png',
        url: ''
      }
    ],
    audio: [
      {
        src: './audio/let-it-be.mp3',
        author: 'Beatles - Let It Be'
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'в 3',
          ref: 'fail'
        },
        {
          text: 'в 12',
          ref: 'fail'
        },
        {
          text: 'в 13',
          ref: 'fail'
        },
        {
          text: 'все верно -> проверить отсек двигателей',
          ref: 'engine'
        },
      ]
    } 
  })


  let pipe = new Content({
    name: 'pipe',
    title: 'Фонтаны...',
    text: `
    Вы закрываете кран и видите на датчике быстрое увеличение температуры. После чего в нескольких местах труба трескается и потихоньку выпрыскивается охладитель на основе гелия. Часть попала на вас, но, благодаря костюму, с вами всё в порядке. 
    `,
    images: [
      {
        src: './img/pipe.jpg',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'спаять трещину',
          ref: 'welding'
        },
        {
          text: 'перекрыть соседний кран и только тогда спаять',
          ref: 'welding'
        },
        {
          text: 'назад!',
          ref: 'firstProblem'
        },
      ]
    } 
  })


  let engine = new Content({
    name: 'engine',
    title: 'Двигатели',
    text: `
    В корабле уже 35 C, и становится очень жарко. Вы слышите какие-то шумы исходящие из отсека с двигателями. Начинаете быстро бежать благодаря искусственной гравитации и пытаетесь открыть дверь отпечатком пальца. Палец запотел и дверь не снимает блокировку, и вы начинаете еще больше волноваться и потеть. 
    Потом все-таки используете Face ID, и дверь открывается
    <br>...
    <br>В отсеке с двигателями сообщается, что здесь температура непригодная для человека: +70 С. Вы продолжаете двигаться и находите поломку в Китайском модуле GNM-11 (генератор отрицательной массы), однако вы не очень понимаете суть поломки
    `,
    images: [
      {
        src: './img/engine.jpg',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'ударить несколько раз',
          ref: 'luck'
        },
        {
          text: 'попросить помощи у команды',
          ref: 'fixed'
        },
      ]
    } 
  })


  let luck = new Content({
    name: 'luck',
    title: 'Инженер мечты',
    text: `
    Резкие выбросы пара в разные стороны, шум, гул... Вы падаете от испуга и теряете на минуту сознание. Очнувшись, вы понимаете, что все заработало, на панели генератора все индикаторы показывают нормальное состояние и вы радостный и довольный, забыв о недавнем стрессе, спешите рассказать все командиру. 
    `,
    images: [
      {
        src: './img/luck.png',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'узнать состояние корабля',
          ref: 'status'
        },
        {
          text: 'отправиться на мостик командира',
          ref: 'crash'
        },
      ]
    } 
  })


  let fixed = new Content({
    name: 'fixed',
    title: 'Fixed!',
    text: `
    Вы позвали на помощь и вместе с командой пытаетесь починить генератор. Инженер смог активировать систему охлаждения в отсеке. После работ над генератором, температура стабилизировалась. 
    <br>Проблема оказалась в забитом шланге охлаждения.
    <br>Однако в коридоре все еще жарко.
    `,
    images: [
      {
        src: './img/fixed.jpg',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'отправиться на мостик командира',
          ref: 'crash'
        },
        {
          text: 'узнать состояние корабля',
          ref: 'status'
        },
      ]
    } 
  })


  let crash = new Content({
    name: 'crash',
    title: 'Сбавляем обороты',
    text: `
    Пройдя сквозь жаркие коридоры вы слышите взрывы и шипение, не дойдя до мостика командира
    <br>...
    <br>Тревога по всему кораблю. Сообщается, что трубы лопнули и важные отсеки придется отключить. В итоге вы остаетесь без 3 двигателей из 10 и 4 генераторов отрицательной массы.
    `,
    images: [
      {
        src: './img/crash.jpg',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'сказать, что и так починим',
          ref: 'fail'
        },
        {
          text: 'предложить найти планету для посадки',
          ref: 'end'
        },
      ]
    } 
  })


  let fail = new Content({
    name: 'fail',
    title: 'Улетаем отсюда!',
    text: `
    О нет! Ничего не помогло, и температура стала расти невероятно быстро. Различные трубы начали трещать и лопаться, выпуская радиоактивные и опасные вещества. Везде завизжала тревога, и вы экстренно стали всей командой эвакуироваться на Суперджет. Путь на Землю займет 40 дней.
    <br>...
    <br>Миссия провалена
    `,
    images: [
      {
        src: './img/fail.png',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'Заново',
          ref: 'index'
        },
      ]
    } 
  })


  let welding = new Content({
    name: 'welding',
    title: 'Сварка швов',
    text: `
    Приступаем паять! Вы достали высокоточный сварочный аппарат точечного типа с автоматической фокусировкой луча. Сварив два шва, на третьем трубу окончательно разорвало на части, краны не выдержали и кубометры гелия устремились во все отсеки. 
    `,
    images: [
      {
        src: './img/welding.jpg',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'сообщить командиру, что нужна бригада для исправления поломок',
          ref: 'fail'
        },
        {
          text: 'предложить найти планету для посадки',
          ref: 'end'
        },
      ]
    } 
  })


  let status = new Content({
    name: 'status',
    title: 'Поддать парку',
    text: `
    Устремившись к ближайшей панели управления вы и инженеры запрашиваете отчет о состоянии корабля. В нескольких отсеках сохраняется повышенная температура и та самая труба испытывает огромную нагрузку от высокой температуры на узле.
    `,
    images: [
      {
        src: './img/status.jpeg',
        url: ''
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'игнорировать, просто нужно время, чтобы ей остыть',
          ref: 'crash'
        },
        {
          text: 'вернуться и закрыть кран на трубе',
          ref: 'pipe'
        },
      ]
    } 
  })


  let end = new Content({
    name: 'end',
    title: 'Притормозим?',
    text: `
    Командир прислушался к вам и все же решился не рисковать состоянием корабля и снизить скорость. Дрейфуя, вы нашли подходящую планету. Спустя три часа вы кое-как смогли настроить двигатели для посадки и, сломав несколько опорных стоек, ваш корабль смог сесть на землю. Вы оценили обстановку и поняли, что на планете неплохая атмосфера и есть растения. Анализ  дронов показал, что текущая локация - пустыня этой планеты.
    <br>...
    <br>Теперь основная задача - починить корабль
    <br>...
    <br>Первая часть путешествия закончена!
    <br>Основано на нереальных событиях
    `,
    images: [
      {
        src: './img/end.jpg',
        url: ''
      }
    ],
    video: [
      {
        src: './videos/end.mp4',
        author: 'Источник: https://www.kinopoisk.ru/film/251733/'
      }
    ],
    buttons: {
      title: 'Действия',
      btns: [
        {
          text: 'хочу продолжение! (пока недоступно)',
          ref: '#'
        },
        {
          text: 'подписаться',
          src: 'https://vk.com/millenniumit'
        },
      ]
      
    } 
  })



  mplt.pushContent(index)
  mplt.pushContent(meeting)
  mplt.pushContent(start)
  mplt.pushContent(mks)
  mplt.pushContent(firstProblem)
  mplt.pushContent(sokol)
  mplt.pushContent(program)
  mplt.pushContent(pipe)
  mplt.pushContent(engine)
  mplt.pushContent(luck)
  mplt.pushContent(fixed)
  mplt.pushContent(crash)
  mplt.pushContent(fail)
  mplt.pushContent(welding)
  mplt.pushContent(status)
  mplt.pushContent(end)


  mplt.gen(0)

})
