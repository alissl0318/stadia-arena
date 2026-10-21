import ScrollStack, { ScrollStackItem } from './ScrollStack';

const asamalar = [
  {
    eyebrow: 'ADIM 01',
    title: 'Başlangıç ve Kurulum',
    desc: 'Platform parametrelerini ve ilk seçeneklerinizi belirleyin. İhtiyacınıza uygun yapılandırmayı saniyeler içinde tamamlayın.',
    imageSrc: 'images/placeholder.svg'
  },
  {
    eyebrow: 'ADIM 02',
    title: 'Eşleşme ve Etkileşim',
    desc: 'Kullanıcı bildirimleri ve eşleşme akışı ile süreç ilerler. Katılım sağlandığında sistem gerekli onayları üretir.',
    imageSrc: 'images/placeholder.svg'
  },
  {
    eyebrow: 'ADIM 03',
    title: 'Doğrulama ve Başlama',
    desc: 'Gerekli doğrulama adımları tamamlandığında oturum aktif hale gelir ve etkileşim başlar.',
    imageSrc: 'images/placeholder.svg'
  },
  {
    eyebrow: 'ADIM 04',
    title: 'Değerlendirme ve Skor',
    desc: 'Performans ve katılım sonuçları şeffaf bir şekilde listelenir ve puanlama sistemine işlenir.',
    imageSrc: 'images/placeholder.svg'
  },
  {
    eyebrow: 'ADIM 05',
    title: 'Süreklilik ve Başarı',
    desc: 'Düzenli kullanım ile seviye ve rozet kazanımları devam eder. Her yeni döngüde başarı grafiği güncellenir.',
    imageSrc: 'images/placeholder.svg'
  }
];

export default function OkeyAsamalarStack() {
  return (
    <ScrollStack
      itemDistance={120}
      itemScale={0.03}
      itemStackDistance={30}
      stackPosition="20%"
      scaleEndPosition="10%"
      baseScale={0.85}
      rotationAmount={0}
      blurAmount={0.5}
    >
      {asamalar.map((item, i) => (
        <ScrollStackItem key={i}>
          <div className="stack-card-media">
            {item.imageSrc ? (
              <img src={item.imageSrc} alt={item.title} />
            ) : (
              <div className="stack-card-media-placeholder" />
            )}
          </div>
          <p className="stack-card-eyebrow">{item.eyebrow}</p>
          <h3 className="stack-card-title">{item.title}</h3>
          <p className="stack-card-desc">{item.desc}</p>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
