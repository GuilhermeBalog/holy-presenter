import { PptxGenSlideMaker } from '@/lib/PptxGenSlideMaker';
import { Presenter } from '@/lib/Presenter';
import Head from 'next/head';
import { FormEventHandler, useState } from 'react';

const initialSongs = [
  "Vinde, cristãos, vinde à porfia Hinos cantemos de louvor\nHinos de paz e de alegria Hinos de anjos do Senhor\n\nGlória a Deus nas alturas. Glória a Deus nas alturas\n\nFoi nesta noite venturosa do nascimento do Senhor\nQue os anjos de voz harmoniosa deram a Deus o seu louvor\n\nVinde juntar-vos aos pastores Vinde com eles a Belém\nVinde correndo pressurosos. O Salvador que, enfim, nos vem.",
  "Oitavo dia antes das Calendas de Janeiro. Lua vigésima quarta.\nTranscorridos muitos séculos desde a criação do mundo\nquando, no princípio, Deus criou o céu e a terra\nE formou o homem à sua imagem;\nDepois de muitos séculos desde que, após o dilúvio,\no Altíssimo pusera entre as nuvens o arco sinal de aliança e de paz;\nvinte e um séculos depois que Abraão, nosso pai na fé,\nmigrou da terra de Ur dos Caldeus;\n\nTreze séculos depois da saída do povo de Israel do Egito,\nconduzido por Moisés; cerca de mil anos depois da unção real de Davi;\nna sexagésima quinta semana, segundo a profecia de Daniel;\ndurante a Olimpíada centésima nonagésima quarta;\nno ano setecentos e cinquenta e dois da fundação de Roma;\n\nNo quadragésimo segundo ano do império de Cesar Otaviano Augusto,\nquando a paz reinava em toda a terra,\nJesus Cristo, Deus eterno e Filho do eterno Pai,\nquerendo santificar o mundo com seu piíssimo advento,\nconcebido pelo Espírito Santo, decorridos nove meses após a sua concepção,\nnasceu em Belém de Judá, da Virgem Maria, feito homem:\nNatividade de Nosso Senhor Jesus Cristo, segundo a carne.",
  "Eu confesso a Deus e a vós irmãos. Tantas vezes pequei, não fui fiel\nPensamentos e palavras, atitudes e omissões.\nPor minha culpa, tão grande culpa.\n\nSenhor piedade, Cristo piedade, tem piedade, ó Senhor (2x)\n\nPeço à Virgem Maria, nossa Mãe E a vós meus irmãos, rogueis por mim\nA Deus Pai que nos perdoa e nos sustenta em Sua mão.\nPor Seu amor, tão grande amor",
  "Glória, glória, anjos do céu. Cantam todos Seu amor\nE na terra, homens de paz Deus merece o louvor\n\nDeus e Pai, nós Vos louvamos. Adoramos, bendizemos.\nDamos glória ao Vosso nome Vossos dons agradecemos.\nSenhor nosso, Jesus Cristo. Unigênito do Pai\nVós de Deus Cordeiro Santo. Nossas culpas perdoai.\n\nVós que estais junto do Pai. Como nosso intercessor\nAcolhei nossos pedidos. Atendei nosso clamor.\nVós somente sois o Santo, o Altíssimo, o Senhor.\nCom o espírito divino de Deus Pai no esplendor",
  "Hoje nasceu para nós O Salvador, que é Cristo, o Senhor!\nHoje nasceu para nós O Salvador, que é Cristo, o Senhor!\n\nCantai ao Senhor Deus um canto novo. Cantai ao Senhor Deus, ó Terra inteira Cantai e bendizei Seu santo nome.\n\nDia após dia, anunciai Sua salvação. Manifestai a Sua glória entre as nações E entre os povos do universo Seus prodígios.\n\nO céu se rejubile e exulte a terra. Aplauda o mar com o que vive em suas águas. Os campos, com seus frutos, rejubilem\nE exultem as florestas e as matas\n\nNa presença do Senhor, pois Ele vem. Porque vem para julgar a Terra inteira. Governará o mundo todo com justiça\nE os povos julgará com lealdade",
  "Aleluia, Aleluia!\nAleluia, Aleluia!\n\nEu vos trago a boa-nova de uma grande alegria:\né que hoje vos nasceu o Salvador, Cristo, o Senhor!",
  "Sobe a Jerusalém, Virgem oferente sem igual\nVai, apresenta ao Pai, teu Menino: Luz que chegou no Natal. E, junto à sua cruz, quando Deus morrer, fica de pé.\nSim, Ele te salvou, mas o ofereceste por nós com toda fé.\n\nNós vamos renovar este sacrifício de Jesus.\nMorte e ressurreição, vida que brotou de sua oferta na cruz\nMãe, vem nos ensinar a fazer da vida uma oblação\nCulto agradável a Deus é fazer a oferta do próprio coração.",
  "Santo, Santo, Santo. Senhor, Deus do Universo.\nO céu e a terra proclamam a Vossa glória.\nHosana nas alturas! Hosana!\nHosana nas alturas! Hosana!\n\nBendito é aquele que vem em nome do Senhor.\nBendito é aquele que vem em nome do Senhor.",
  "Cristãos, vinde todos, com alegres cantos\nOh! Vinde, oh! Vinde até Belém\nVede nascido, vosso Rei eterno\n\nOh! Vinde, adoremos! Oh! Vinde, adoremos!\nOh! Vinde, adoremos! O Salvador!\n\nHumildes pastores deixam seus rebanhos\ne alegres acorrem ao Rei dos céus.\nNós, igualmente, cheios de alegria\n\nO Deus invisível de eternal grandeza\nSob véus de humildade, podemos ver.\nDeus pequenino, Deus envolto em faixas!\n\nNasceu em pobreza, repousando em palhas\nO nosso afeto lhe vamos dar\nTanto amou-nos! Quem não há de amá-lo?\n\nA estrela do Oriente conduziu os Magos\nE a este Mistério envolve em luz\nTal claridade, também, seguiremos",
  "Noite feliz, noite feliz! Ó Senhor, Deus de amor\nPobrezinho nasceu em Belém. Eis na lapa Jesus, nosso bem.\nDorme em paz, ó Jesus! Dorme em paz, ó Jesus!\n\n\nNoite feliz, noite feliz! Eis que, no ar, vêm cantar\nAos pastores, os anjos do céu Anunciando a chegada de Deus,\nDe Jesus, Salvador, de Jesus, Salvador.\n\n\nNoite feliz, noite feliz! Ó Jesus, Deus da luz\nQuão afável é o Teu coração, que quiseste nascer nosso irmão\nE a nós todos salvar. E a nós todos salvar.",
  "Natal é vida que nasce. Natal é Cristo que vem.\nNós somos o seu presépio e a nossa casa é Belém.\n\nDeus se tornou nossa grande esperança e como criança no mundo nasceu. Por isto vamos abrir nossa porta, A Cristo o que importa é conosco viver.\n\nEle assumiu nossa vida terrena. Ao céu nos acena com gesto de amor./ Veio a todos salvar igualmente. Queria somente ser nosso Pastor.\n\nDeus infinito aos homens se iguala e a todos só fala palavras de paz./ Quer ser o nosso irmão mais fraterno./ Do seu Reino eterno herdeiros nos faz."
];

function parseFormData(formData: FormData) {
  const result: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};

  for (const [key, value] of formData.entries()) {
    if (result[key] !== undefined) {
      result[key] = [result[key], value].flat();
    } else {
      result[key] = value;
    }
  }

  return result;
}

export default function Index() {
  const [songs, setSongs] = useState(initialSongs);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const powerpoint = new PptxGenSlideMaker();
    const presenter = new Presenter(powerpoint);

    songs.forEach(song => {
      if(!song) return;

      presenter.writeLyrics(song);
      // powerpoint.add(song);
      powerpoint.addBlankSlide();
    });

    powerpoint.showSlides();
  };

  return (
    <>
      <Head>
        <title>Auto Presenter</title>
      </Head>

      <header>
        <h1>Criar apresentação</h1>
      </header>

      <main>


      <form onSubmit={handleSubmit}>
      <p>
        <button type="button">+ Adicionar música</button>
        <button type="submit">Gerar Apresentação</button>
        <button type="reset">Limpar músicas</button>
      </p>
        <div className="form-group" id="songs-container">
          {songs.map((song, i) => (
            <div className="form-group" key={i + 1}>
              <label>Música {i + 1}
                <textarea name="songs" placeholder="Digite o conteúdo" defaultValue={song} />
              </label>
            </div>
          ))}
        </div>
      </form>
      </main>
    </>
  )
}