import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Sun, 
  Moon, 
  ChevronDown, 
  ArrowUpRight, 
  Calendar, 
  Trophy, 
  BookOpen, 
  ExternalLink, 
  X, 
  Sparkles, 
  ZoomIn, 
  Flame, 
  Crown,
  Compass,
  Shield,
  Users,
  Code,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// =========================================================================
// Aceternity UI: FlipWords Component
// =========================================================================
export const FlipWords = ({
  words,
  duration = 2600,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        exit={{ opacity: 0, y: -24, filter: "blur(6px)", position: "absolute" }}
        className={`inline-block ${className || ""}`}
      >
        {currentWord}
      </motion.span>
    </AnimatePresence>
  );
};

// =========================================================================
// Aceternity UI: HeroHighlight / Highlight Component (Normal solid vibrant gradient)
// =========================================================================
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline-block",
      }}
      className={`relative inline-block px-3.5 py-0.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-blue-500/35 font-bold ${className || ""}`}
    >
      {children}
    </motion.span>
  );
};

// =========================================================================
// Data Models & Interfaces
// =========================================================================
type PageTab = 'home' | 'leadership' | 'achievements' | 'hall-of-fame' | 'events' | 'executive-committee' | 'past-ec' | 'proddot' | 'credits';

interface CouncilMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface HofMember {
  name: string;
  position: string;
  image: string | null;
  fbLink: string;
  auraTier: 'gold' | 'sapphire' | 'amethyst' | 'silver';
  titleHonor?: string;
  memorial?: boolean;
}

interface AchievementItem {
  id: number;
  url: string;
  title: string;
  category: 'Nationals' | 'Championships' | 'Regional';
  year: string;
}

interface ECLeader {
  name: string;
  role: string;
  image: string;
  fbLink?: string;
  featured?: boolean;
}

// 3 Prestigious Council Leaders (Freestanding, no box!)
const BRAND_LOGO_DAY = 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1776680144/Gemini_Generated_Image_a5pf80a5pf80a5pf-removebg-preview_qv4hvj.png';
const BRAND_LOGO_NIGHT = 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792710900/image_125bd407-removebg-preview_zedgyf.png';

const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    name: 'Tahmina Yasmeen',
    role: 'Headmistress',
    bio: "Providing visionary institutional stewardship and patronizing the intellectual legacy and debating prominence of MGBSDC across Bangladesh.",
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700905/image_82442e2e-removebg-preview_kabute.png'
  },
  {
    name: 'Naznin Rashid',
    role: 'Assistant Headmistress',
    bio: "Championing academic excellence, guiding executive operations, and ensuring the debating fraternity upholds rigorous parliamentary ethics.",
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700915/image_5df89135-removebg-preview_spwfie.png'
  },
  {
    name: 'Salina Sultana',
    role: 'Moderator',
    bio: "Spearheading debate pedagogy, strategic motion analysis, and dedicated mentorship, fostering generations of champion speakers.",
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792711492/image_11c727e4-removebg-preview_bfdx2h.png'
  }
];

// Hall of Fame: Exact 20 debater chronology in the Grand Temple of Honor
const HALL_OF_FAME: HofMember[] = [
  {
    name: 'Ashraful Islam Shagor',
    position: 'Former President (1926–1927)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700892/image_dc6aadad-removebg-preview_gltu21.png',
    fbLink: 'https://www.facebook.com/sagor.ashraf',
    auraTier: 'gold',
    titleHonor: 'Presidential Laureate'
  },
  {
    name: 'Shahriar Shakil',
    position: 'Former General Secretary (1926–1927)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700983/image_9e967d1b-removebg-preview_kxfpyx.png',
    fbLink: 'https://www.facebook.com/shahriarshakilai',
    auraTier: 'sapphire',
    titleHonor: 'Secretariat Pioneer'
  },
  {
    name: 'Stallin Hasan',
    position: 'Former President (1997–1999)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700846/image_e6c1ce94-removebg-preview_ybeabo.png',
    fbLink: 'https://www.facebook.com/stalinhassan',
    auraTier: 'gold',
    titleHonor: 'Foundational President'
  },
  {
    name: 'Nahian Bin Khaled',
    position: 'Former President (2009–2010)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700972/image_9f050dd8-removebg-preview_hzfnlr.png',
    fbLink: 'https://www.facebook.com/nahianbk',
    auraTier: 'sapphire',
    titleHonor: 'Presidential Laureate'
  },
  {
    name: 'Syed Tasnem Mahmood Tushon',
    position: 'Former President (2005–2006)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700999/image_5b324ced__1_-removebg-preview_ncmmkx.png',
    fbLink: 'https://www.facebook.com/tasnemmahmood',
    auraTier: 'amethyst',
    titleHonor: 'Golden Era President'
  },
  {
    name: 'Sohan Mohaimenul',
    position: 'Former President (2008–2009)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700811/image_ab56972-removebg-preview_ppus0f.png',
    fbLink: 'https://www.facebook.com/sohan.mohaimenul',
    auraTier: 'sapphire',
    titleHonor: 'Presidential Laureate'
  },
  {
    name: 'Muhit Hasan',
    position: 'Former General Secretary (2009–2010)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792709952/1000114615_owi3f2.png',
    fbLink: 'https://www.facebook.com/muhit.hasan',
    auraTier: 'sapphire',
    titleHonor: 'Distinguished General Secretary'
  },
  {
    name: 'Raisul Arafat Riad',
    position: 'Former Vice President (2009–2010)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792709904/1000114616_qy7ey5.png',
    fbLink: 'https://www.facebook.com/raisul.arafat',
    auraTier: 'silver',
    titleHonor: 'Vice Presidential Laureate'
  },
  {
    name: 'Late Farhan Bin Liaquat',
    position: 'Former General Secretary (2010–2011)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700824/image_60ed036b-removebg-preview_n65b37.png',
    fbLink: 'https://www.facebook.com/share/1JVSJzdsLv/',
    auraTier: 'gold',
    titleHonor: 'In Eternal Memory',
    memorial: true
  },
  {
    name: 'Adib Rahman Ethar',
    position: 'Former General Secretary (2008–2009)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700835/image_97e8bf32__1_-removebg-preview_iuh8yd.png',
    fbLink: 'https://www.facebook.com/ethar.adibrahman',
    auraTier: 'silver',
    titleHonor: 'Distinguished General Secretary'
  },
  {
    name: 'Khandaker Wahedur Rahman',
    position: 'Former General Secretary (2005–2006)',
    image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895546/KhandakerWahedurRahman-removebg-preview_b8e2tl.png',
    fbLink: 'https://www.facebook.com/kwrahman',
    auraTier: 'amethyst',
    titleHonor: 'Distinguished General Secretary'
  },
  {
    name: 'Azimuddin Khan Sabbir',
    position: 'Former General Secretary (2000–2001)',
    image: null,
    fbLink: 'https://www.facebook.com/mak1941',
    auraTier: 'silver',
    titleHonor: 'Millennium General Secretary'
  },
  {
    name: 'H M Sabir Noor',
    position: 'Former President (2010–2011)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700876/image_2d2a5a06-2-removebg-preview_vtth8v.png',
    fbLink: 'https://www.facebook.com/h.m.sabirnoor',
    auraTier: 'gold',
    titleHonor: 'Presidential Laureate'
  },
  {
    name: 'Amit Pramanik',
    position: 'Former President (2011–2012)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700937/image_fd780bf3-removebg-preview_lgbqck.png',
    fbLink: 'https://www.facebook.com/Amit.MGBS13',
    auraTier: 'sapphire',
    titleHonor: 'Two-Term President'
  },
  {
    name: 'Mahir Pranto',
    position: 'Master Debater',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700950/image_e088dab9-removebg-preview_k64zcl.png',
    fbLink: 'https://www.facebook.com/mahirpranto',
    auraTier: 'silver',
    titleHonor: 'National Champion Speaker'
  },
  {
    name: 'Nafis Ferdous Sakib',
    position: 'Former President (2012–2014)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792709924/1000114617_wyjj3z.png',
    fbLink: 'https://www.facebook.com/nafis.sakib',
    auraTier: 'gold',
    titleHonor: 'Presidential Laureate'
  },
  {
    name: 'Sifat Jobaer',
    position: 'Former President (2016–2017)',
    image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895669/Sijo-removebg-preview_o9wzou.png',
    fbLink: 'https://www.facebook.com/sifat.jobaer',
    auraTier: 'amethyst',
    titleHonor: 'Presidential Laureate'
  },
  {
    name: 'Kefayet Alfesan',
    position: 'Former General Secretary (2016–2017)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792709967/1000114618_rz1phe.png',
    fbLink: '',
    auraTier: 'silver',
    titleHonor: 'Distinguished General Secretary'
  },
  {
    name: 'Shihab Al Noman Tushar',
    position: 'Former General Secretary (2017–2018)',
    image: null,
    fbLink: 'https://www.facebook.com/shihabtushar.noman',
    auraTier: 'silver',
    titleHonor: 'Distinguished General Secretary'
  },
  {
    name: 'Anik Sajli',
    position: 'Former President',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792709939/1000114619_shyodj.png',
    fbLink: '',
    auraTier: 'gold',
    titleHonor: 'Presidential Laureate'
  },
  {
    name: 'Salman Shahriar',
    position: 'Former President (2017–2018)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700963/image_d67fe03d-removebg-preview_bm7mf9.png',
    fbLink: 'https://www.facebook.com/salmanshahriar.sakib.9',
    auraTier: 'sapphire',
    titleHonor: 'Presidential Laureate'
  },
  {
    name: 'Tahsin Islam',
    position: 'Master Debater',
    image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895652/Tahsin-removebg-preview_buxcff.png',
    fbLink: 'https://www.facebook.com/tahsinislam.fahim.5',
    auraTier: 'silver',
    titleHonor: 'Grand Orator'
  },
  {
    name: 'Marjukur Rahib',
    position: 'Former General Secretary (2018–2020)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700802/image_73dd1a57-removebg-preview_axmvou.png',
    fbLink: 'https://www.facebook.com/marjukar.rahib.9',
    auraTier: 'sapphire',
    titleHonor: 'Distinguished General Secretary'
  },
  {
    name: 'Gazi Mahtab',
    position: 'Former President (2022–2023)',
    image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792700990/image_a275e3c9__1_-removebg-preview_lqlj66.png',
    fbLink: 'https://www.facebook.com/gazi.mahtab.5',
    auraTier: 'gold',
    titleHonor: 'Presidential Laureate'
  }
];

// All 21 Achievement items (Cyan / Royal Sapphire accents, no orange!)
const ACHIEVEMENTS_DATA: AchievementItem[] = [
  { id: 1, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1776706553/Achievement_dlggol.jpg', title: 'National Parliamentary Victory', category: 'Nationals', year: '2024' },
  { id: 2, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1776706531/Acheivement_hf3uwt.jpg', title: 'Champion Trophy - Inter-School Open', category: 'Championships', year: '2024' },
  { id: 3, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1776706588/Achievement3_ngxztb.jpg', title: 'Regional Debating Laurels', category: 'Regional', year: '2023' },
  { id: 4, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1776706610/Achievement4_gkkozr.jpg', title: 'Best Delegation Honor', category: 'Nationals', year: '2023' },
  { id: 5, url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895611/Achievement2_wd3uyt.jpg', title: 'Dhaka Regional Crown', category: 'Regional', year: '2024' },
  { id: 6, url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895612/Achievement3_j6znbr.jpg', title: 'Inter-College Invitational Champion', category: 'Championships', year: '2023' },
  { id: 7, url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895588/Achievement4_bhqwtv.jpg', title: 'Grand Finale Runner-Up', category: 'Nationals', year: '2023' },
  { id: 8, url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895620/Achievements5_r4d4oz.png', title: 'Debate of Champions Memento', category: 'Championships', year: '2024' },
  { id: 9, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434498/471524578_10162664340016052_5269630890695643375_n_mkgupx.jpg', title: 'All-Nation Championship Victory', category: 'Nationals', year: '2024' },
  { id: 10, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434498/485151231_1161615859096443_6043955258587694678_n_z0zsx8.jpg', title: 'Premier League Best Speaker Crest', category: 'Championships', year: '2024' },
  { id: 11, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434498/484804964_1158979122693450_3450765066095074753_n_dhxnuk.jpg', title: 'Youth Debating Fest Grand Champions', category: 'Nationals', year: '2024' },
  { id: 12, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434498/485799210_1162081979049831_7547037378360157317_n_ecm9cb.jpg', title: 'Golden Gavel Recipient', category: 'Regional', year: '2023' },
  { id: 13, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434497/485759199_1163733848884644_2190452560940971180_n_rpovrx.jpg', title: 'Inter-School Parliamentary Shield', category: 'Championships', year: '2023' },
  { id: 14, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434497/494038815_1190051922919503_562478423446290195_n_pfc7xb.jpg', title: 'National Knockout Finalists', category: 'Nationals', year: '2024' },
  { id: 15, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434497/485379662_1163729082218454_7306090191921053672_n_ntnuyb.jpg', title: 'Presidential Debate Honors', category: 'Championships', year: '2023' },
  { id: 16, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434497/529760970_1270401988217829_3158278463478997614_n_kn8h3n.jpg', title: 'Gold Medal Podium Finish', category: 'Nationals', year: '2024' },
  { id: 17, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434497/493076815_1190051962919499_1365547240643363616_n_ryxkcp.jpg', title: 'State Debate Trophy', category: 'Regional', year: '2024' },
  { id: 18, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434497/518137302_1245903910667637_580856443545933379_n_gmtcqv.jpg', title: 'Oratorical Excellence Cup', category: 'Championships', year: '2024' },
  { id: 19, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434496/673169376_1477216767536349_5675667561684685254_n_rv7nqz.jpg', title: 'Silver Jubilee National Memento', category: 'Nationals', year: '2024' },
  { id: 20, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434496/500911318_1213611010563594_370592558443035489_n_ff30xa.jpg', title: 'Grand Championship Certificate', category: 'Regional', year: '2023' },
  { id: 21, url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1781434496/541377575_1290290422895652_7309911615361866398_n_uvkohr.jpg', title: 'MGBSDC Hall of Champions Plaque', category: 'Nationals', year: '2024' }
];

// Dedicated Events Gallery (Glorified, high vibrancy & memories)
const EVENT_GALLERY = [
  { id: 1, title: '18th National Debate Championship', url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895540/18th_vn4pr3.jpg', subtitle: '64 Nationwide Contingents Sparring on Grand Stage', date: 'Dec 2024' },
  { id: 2, title: '17th National Debate Championship', url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895538/17th_ucma9r.jpg', subtitle: 'Parliamentary Glory & Oratorical Excellence', date: '2023' },
  { id: 3, title: 'Back 2 Back Championship (B2B Season 2)', url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1776700567/B2B_yemzwl.jpg', subtitle: 'High-Stakes British Parliamentary Faceoffs', date: '2024' },
  { id: 4, title: 'Debate Beyond Fear Novitiate Bootcamp', url: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1776700850/Debate_Beyond_Fear_tlyxz6.jpg', subtitle: 'Conquering Stage Fright & Dialectic Logic Workshops', date: '2024' },
  { id: 5, title: 'Annual Debate Festival Official Poster', url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895570/Event_tds9ka.jpg', subtitle: 'Nationwide Circuit Invitation Announcement', date: '2024' },
  { id: 6, title: 'Intense Preliminary Round Clash', url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895570/Event1_umxjrl.jpg', subtitle: 'Opening Government vs Closing Opposition', date: '2024' },
  { id: 7, title: 'National Stage Keynote Presentation', url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895568/Event1_alfb2s.jpg', subtitle: 'Ceremonial Opening with Chief Guests & Faculty', date: '2024' },
  { id: 8, title: 'Chief Adjudicator Panel Deliberations', url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895571/Event2_cknl1l.jpg', subtitle: 'Evaluating Nuanced Rebuttals & Case Structures', date: '2024' },
  { id: 9, title: 'Festival Media Call & Press Briefing', url: 'https://tlzmrvxysbdgzdikdpox.supabase.co/storage/v1/object/public/MGBSDC%20MC/Event2.jpg', subtitle: 'National Print & Digital Media Broadcast', date: '2024' },
  { id: 10, title: 'Champions on the Grand Podium', url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895565/Event3_ivtsxu.jpg', subtitle: 'Lifting the Prestigious National Champions Trophy', date: '2024' },
  { id: 11, title: 'Audience & Floor Floor Debaters', url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895563/Event4_fwgjld.jpg', subtitle: 'Engaged Student Intellectuals Challenging Arguments', date: '2024' },
  { id: 12, title: 'Grand Closing Banquet & Fellowship', url: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895559/Event5_tohf8r.jpg', subtitle: 'Memories Forged in Brotherhood & Rhetoric', date: '2024' }
];

// 2025 Executive Committee (Freestanding cutout portraits, no box enclosures!)
const EC_2025: ECLeader[] = [
  { name: 'Ziad Bin Hasan', role: 'President', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895625/ziad_f2x0ap.png', fbLink: 'https://www.facebook.com/ziad.bin.hasan', featured: true },
  { name: 'Arif Shahriar Shihab', role: 'General Secretary', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895583/ArifShahriarShihab-removebg-preview_b07mli.png', fbLink: 'https://www.facebook.com/arifshahriar.shihab', featured: true },
  { name: 'Md. Samiul Haque', role: 'Vice President\nAdministration', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895683/samiul-removebg-preview_ovpckm.png', fbLink: 'https://www.facebook.com/samiul.samin.96' },
  { name: 'Md. Adil Abshar Shezan', role: 'Vice President\nDebate & Workshop', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895671/Sezan-removebg-preview_slkhx3.png', fbLink: 'https://www.facebook.com/md.adil.abshar.shezan' },
  { name: 'Abrar Mahir', role: 'Assistant General Secretary', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895617/abrarmahir-removebg-preview_nec1ug.png', fbLink: 'https://www.facebook.com/hashem.gazi.509' },
  { name: 'Md Mobasher Rahman', role: 'Joint Secretary', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780896806/mobs-removebg-preview_fr72yl.png', fbLink: 'https://www.facebook.com/mobasher.rahman.16' },
  { name: 'Faiyaz Kabir Mugdho', role: 'Assistant Joint Secretary', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780896808/mugdho-removebg-preview_qjzvu6.png', fbLink: 'https://www.facebook.com/faiyaz.kabir.mugdho' },
  { name: 'Jawad Jarif', role: 'Organizing Secretary', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895560/Jawad-removebg-preview_ql6mqs.png', fbLink: 'https://www.facebook.com/jawoad.jarif' },
  { name: 'Tanvir Ahmed Tonmoy', role: 'Assistant Organizing Secretary', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895641/tanvirahmedtonmoy-removebg-preview_novrdb.png', fbLink: 'https://www.facebook.com/tanvir.ahmed.tonmoy.564754' },
  { name: 'Yamin Rahman Ehan', role: 'Publication Secretary', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895575/ehan-removebg-preview_lilfhp.png', fbLink: 'https://www.facebook.com/yamin.rahman.ehan' },
  { name: 'Md. Yusha Ahmed', role: 'Magazine Editor', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895629/yusha_p67jjq.png', fbLink: 'https://www.facebook.com/yusha.rijvi.24' },
  { name: 'K M Jafir Shafi Arib', role: 'Head of Press & Publication', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895560/jafir_ddpdle.png' },
  { name: 'Sudipto Roy', role: 'Research & Development Secretary', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895655/sudipto-removebg-preview_qzxmmu.png', fbLink: 'https://www.facebook.com/SudiPtoRoy.07' },
  { name: 'Abid Ibrahim', role: 'Office Secretary', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895622/abidibrahim-removebg-preview_lwhmrw.png' },
  { name: 'Sahad Rahman Arikto', role: 'Assistant Office Secretary', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895643/Unknown_cosufl.png' },
  { name: 'Araf Al Samin', role: 'Executive Member & Web Developer', image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792714419/image_ef1581ea__1_-removebg-preview_1_ibjm6b.png', fbLink: 'https://www.facebook.com/profile.php?id=61570414709460' },
  { name: 'Nahid Hasan', role: 'Executive Member', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895291/Nahid-removebg-preview_mwi5ao.png', fbLink: 'https://www.facebook.com/nahid.hasan.779373' },
  { name: 'Raisul Islam Jahin', role: 'Executive Member', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895562/Jahin_bwojib.png', fbLink: 'https://www.facebook.com/SudiPtoRoy.07' },
  { name: 'Muizz Ahbab', role: 'Executive Member', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895436/2Rajit_dzlrov.png', fbLink: 'https://www.facebook.com/muizz.ahbab' },
  { name: 'Usaeed Boksh', role: 'Executive Member', image: 'https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895633/Usaeed_koi3jp.png', fbLink: 'https://www.facebook.com/usaeed.boksh' },
  { name: 'Prince Sarker', role: 'Executive Member', image: 'https://res.cloudinary.com/dz7ulk8lb/image/upload/q_auto/f_auto/v1781434496/2e1addf9-e710-46d4-b9a2-64da51734daa_zid18y.png', fbLink: 'https://www.facebook.com/profile.php?id=61586453788493' }
];

// Complete Past EC Roster (No Missing Terms: Includes EC 2021–2022 and EC 2020–2021!)
const PAST_EC_DATA = [
  {
    year: 'EC 2024–2025',
    members: [
      { role: 'President', name: 'Areed Aryan' },
      { role: 'Vice President (DnW)', name: 'Shahbin Ahnaf' },
      { role: 'Vice President (Admin)', name: 'Siyam Chowdhury' },
      { role: 'General Secretary', name: 'Tanzim Rayhan' },
      { role: 'Asst. General Secretary', name: 'Arif Shahriar Shihab' },
      { role: 'Joint Secretary', name: 'Md. Adil Abshar Shezan' },
      { role: 'Asst. Joint Secretary', name: 'Mobasher Rahman' },
      { role: 'Magazine Editor', name: 'Faiyaz Kabir Mugdho' },
      { role: 'Organizing Secretary', name: 'Arko Sarker' },
      { role: 'Asst. Organizing Secretary', name: 'Abrar Mahir' },
      { role: 'Research & Development Secretary', name: 'Jawad Jarif' },
      { role: 'Publication Secretary', name: 'Ziad Bin Hasan' },
      { role: 'Office Secretary', name: 'Tanvir Ahmed Tonmoy' },
      { role: 'Asst. Office Secretary', name: 'Md. Samiul Haque' }
    ]
  },
  {
    year: 'EC 2023–2024',
    members: [
      { role: 'President', name: 'Siyam Al Noman' },
      { role: 'Vice President (Admin)', name: 'Abu Mosa Mohim' },
      { role: 'Vice President (DnW)', name: 'Abdullah Omar Nasif Sefat' },
      { role: 'General Secretary', name: 'Tausif Ahmed Orpu' },
      { role: 'Assistant General Secretary', name: 'Md. Rafid Hossain' },
      { role: 'Joint Secretary', name: 'Imam Ibnul' },
      { role: 'Assistant Joint Secretary', name: 'Md. Ridwan Hasan' },
      { role: 'Magazine Editor', name: 'Siyam Chowdhury' },
      { role: 'Organizing Secretary', name: 'Areed Aryan' },
      { role: 'Research & Development Secretary', name: 'Tanzim Rayhan' },
      { role: 'Office Secretary', name: 'Shahbin Ahnaf' }
    ]
  },
  {
    year: 'EC 2022–2023',
    members: [
      { role: 'President', name: 'Gazi Mahtab' },
      { role: 'Vice President (Admin)', name: 'Siam Hasan' },
      { role: 'Vice President (D&W)', name: 'Abdus Shakur Sifat' },
      { role: 'General Secretary', name: 'Zobayer Hossain Sakif' },
      { role: 'Assistant General Secretary', name: 'Tahsin Sezan' }
    ]
  },
  {
    year: 'EC 2021–2022',
    members: [
      { role: 'President', name: 'Abdus Shakur Sifat' },
      { role: 'Vice President (Admin)', name: 'Gazi Mahtab' },
      { role: 'Vice President (D&W)', name: 'Tahsin Sezan' },
      { role: 'General Secretary', name: 'Zobayer Hossain Sakif' },
      { role: 'Assistant General Secretary', name: 'Rafsan Ahmed' },
      { role: 'Organizing Secretary', name: 'Siam Hasan' },
      { role: 'Magazine Editor', name: 'Ahnaf Tahmid' },
      { role: 'Office Secretary', name: 'Sadman Sakib' }
    ]
  },
  {
    year: 'EC 2020–2021',
    members: [
      { role: 'President', name: 'Tahsin Islam Fahim' },
      { role: 'Vice President (Admin)', name: 'Sanzad Hossain' },
      { role: 'Vice President (D&W)', name: 'Alimil Ahad Pothik' },
      { role: 'General Secretary', name: 'Marjukur Rahib' },
      { role: 'Assistant General Secretary', name: 'Ahnaf Amir Aunabil' },
      { role: 'Organizing Secretary', name: 'Zuhaef' },
      { role: 'Publication Secretary', name: 'Tanvir Hasan' },
      { role: 'Office Secretary', name: 'Oasif' }
    ]
  },
  {
    year: 'EC 2018–2020',
    members: [
      { role: 'President', name: 'Tahsin Islam Fahim' },
      { role: 'Vice President', name: 'Sanzad Hossain' },
      { role: 'General Secretary', name: 'Marjukur Rahib' },
      { role: 'Magazine Editor', name: 'Ahnaf Amir Aunabil' },
      { role: 'Assistant Magazine Editor', name: 'Zuhaef' },
      { role: 'Organizing Secretary', name: 'Alimil Ahad Pothik' },
      { role: 'Assistant Organizing Secretary', name: 'Oasif' },
      { role: 'Publication Secretary', name: 'Tanvir Hasan' },
      { role: 'Office Secretary', name: 'Rafsan' }
    ]
  },
  {
    year: 'EC 2017–2018',
    members: [
      { role: 'President', name: 'Salman Shahriar Sakib' },
      { role: 'Vice President (Admin)', name: 'Atiqur Rahman' },
      { role: 'Vice President (D&W)', name: 'Arpon Biswas Joy' },
      { role: 'General Secretary', name: 'Shihab Al Tushar Noman' },
      { role: 'Assistant General Secretary', name: 'Samio Nobab Shanto' },
      { role: 'Magazine Editor', name: 'Noor Mohammad' },
      { role: 'Assistant Magazine Editor', name: 'Rafi Raihan' },
      { role: 'Organizing Secretary', name: 'Faiyaz Ahmed Mahin' },
      { role: 'Assistant Organizing Secretary', name: 'Hasin Ishraw Sun' },
      { role: 'Publication Secretary', name: 'Eyafee Al Hossain' },
      { role: 'Research & Development Secretary', name: 'Samin Sadaf' },
      { role: 'Office Secretary', name: 'Ishtiaque Ahmed Turjo' }
    ]
  },
  {
    year: 'EC 2016–2017',
    members: [
      { role: 'President', name: 'Sifat Jobaer Apurbo' },
      { role: 'Vice President', name: 'Rafi Ahmed' },
      { role: 'General Secretary', name: 'Kefayet Al Fesan' },
      { role: 'Assistant General Secretary', name: 'Shihab Al Noman Tushar' },
      { role: 'Magazine Editor', name: 'Arpon Biswas Joy' },
      { role: 'Organizing Secretary', name: 'Atiqur Rahman' },
      { role: 'Assistant Organizing Secretary', name: 'Rafi Raihan' },
      { role: 'Publication Secretary', name: 'Salman Shahriar Sakib' },
      { role: 'Office Secretary', name: 'Saimul Islam Shanto' }
    ]
  },
  {
    year: 'EC 2014–2016',
    members: [
      { role: 'President', name: 'Abul Hasan Sajli' },
      { role: 'Vice President', name: 'Tahsin Momin Antor' },
      { role: 'General Secretary', name: 'Syed Sifat Jobayer' },
      { role: 'Assistant General Secretary', name: 'Riwanul Islam' },
      { role: 'Magazine Editor', name: 'Kefayet Al Fesan' },
      { role: 'Publicity & Research', name: 'Inan Marshad' },
      { role: 'Office Secretary', name: 'Showkat Osman Shishir' }
    ]
  },
  {
    year: 'EC 2013–2014',
    members: [
      { role: 'President', name: 'Nafis Ferdous Sakib' },
      { role: 'Vice President', name: 'Shakil Ahmed Shaon' },
      { role: 'General Secretary', name: 'Noor Uddin Hasan Saikat' },
      { role: 'Assistant General Secretary', name: 'Khandokar Mushfiqur Rahman' },
      { role: 'Organizing Secretary', name: 'Abul Hasan Anik' },
      { role: 'Assistant Organizing Secretary', name: 'Tahsin Momin Antor' },
      { role: 'Magazine Editor', name: 'Amit Pramanik' },
      { role: 'Publicity & Research', name: 'Neamutullah Hridoy' },
      { role: 'Office Secretary', name: 'Kefayet Al Fesan' }
    ]
  },
  {
    year: 'EC 2012–2013',
    members: [
      { role: 'President', name: 'Amit Pramanik' },
      { role: 'Vice President', name: 'Md Mushfiqur Rahman (Mahmud)' },
      { role: 'General Secretary', name: 'Shakil Ahmed Shaon' },
      { role: 'Assistant General Secretary', name: 'Nuruddin Hasan Shaikat' },
      { role: 'Organizing Secretary', name: 'Walid' },
      { role: 'Assistant Organizing Secretary', name: 'Shariar' },
      { role: 'Magazine Editor', name: 'Nafis Ferdous Sakib' },
      { role: 'Assistant Magazine Editor', name: 'Rayhan Rahman Rafid' },
      { role: 'Publicity & Research Secretary', name: 'Abul Hasain Anik & Tahsin Momin Antor' },
      { role: 'Office Secretary', name: 'Neamutullah Hridoy' }
    ]
  },
  {
    year: 'EC 2011–2012',
    members: [
      { role: 'President', name: 'Amit Pramanik' },
      { role: 'Vice President', name: 'Md Mushfiqur Rahman (Mahmud)' },
      { role: 'General Secretary', name: 'Shakil Ahmed Shaon' },
      { role: 'Assistant General Secretary', name: 'Nuruddin Hasan Shaikat' },
      { role: 'Magazine Editor', name: 'Nafis Ferdous Sakib' },
      { role: 'Organizing Secretary', name: 'Walid' },
      { role: 'Assistant Organizing Secretary', name: 'Shariar' },
      { role: 'Office Secretary', name: 'Neamutullah Hridoy' }
    ]
  },
  {
    year: 'EC 2010–2011',
    members: [
      { role: 'President', name: 'H M Sabir Noor' },
      { role: 'Vice President', name: 'Salman Hossain Saif' },
      { role: 'General Secretary', name: 'Farhan Bin Liaquat' },
      { role: 'Assistant General Secretary', name: 'Mahmudul Hoq Evan' },
      { role: 'Magazine Editor', name: 'Amit Pramanik' },
      { role: 'Organizing Secretary', name: 'Shakil Ahmed Shawon' },
      { role: 'Assistant Organizing Secretary', name: 'Nafis Ferdous Sakib' },
      { role: 'Publicity & Research Secretary', name: 'Nuruddin Hasan Shaikat' },
      { role: 'Office Secretary', name: 'Md Mushfiqur Rahman (Mahmud)' }
    ]
  },
  {
    year: 'EC 2009–2010',
    members: [
      { role: 'President', name: 'Nahian Bin Khaled' },
      { role: 'Vice President', name: 'Raisul Arafat Riad, Tahan Abdullah' },
      { role: 'General Secretary', name: 'Syed Muhit Hasan' },
      { role: 'Assistant General Secretary', name: 'Muhtadin Islam Promee' },
      { role: 'Magazine Editor', name: 'Adib Rahman Ethar' },
      { role: 'Organizing Secretary', name: 'Md Sadman Saadat' },
      { role: 'Assistant Organizing Secretary', name: 'Shourov Roy Moitra' },
      { role: 'Publicity & Research Secretary', name: 'H M Sabir Noor' },
      { role: 'Office Secretary', name: 'Farhan Bin Liaquat' }
    ]
  }
];

export default function App() {
  const [theme, setTheme] = useState<'night' | 'day'>('night');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLightboxImg, setSelectedLightboxImg] = useState<{ url: string; title: string; subtitle?: string } | null>(null);
  const [achievementFilter, setAchievementFilter] = useState<'All' | 'Nationals' | 'Championships' | 'Regional'>('All');
  const [readingModalOpen, setReadingModalOpen] = useState(false);

  const dayVideoRef = useRef<HTMLVideoElement>(null);
  const nightVideoRef = useRef<HTMLVideoElement>(null);

  // Counter stats for 30 Years of Glory!
  const [yearsCount, setYearsCount] = useState(0);
  const [nationalsCount, setNationalsCount] = useState(0);
  const [trophiesCount, setTrophiesCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const steps = 30;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start++;
      const progress = start / steps;
      setYearsCount(Math.min(30, Math.round(30 * progress)));
      setNationalsCount(Math.min(18, Math.round(18 * progress)));
      setTrophiesCount(Math.min(500, Math.round(500 * progress)));

      if (start >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Ensure videos play reliably across all browsers
  useEffect(() => {
    const playVideos = () => {
      if (dayVideoRef.current) dayVideoRef.current.play().catch(() => {});
      if (nightVideoRef.current) nightVideoRef.current.play().catch(() => {});
    };
    playVideos();
    document.addEventListener('click', playVideos, { once: true });
    return () => document.removeEventListener('click', playVideos);
  }, []);

  // Listen to hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageTab;
      const validTabs: PageTab[] = ['home', 'leadership', 'achievements', 'hall-of-fame', 'events', 'executive-committee', 'past-ec', 'proddot', 'credits'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (tab: PageTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    setAboutDropdownOpen(false);
    setEventsDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'night' ? 'day' : 'night'));
  };

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;
    const isDay = theme === 'day';

    body.classList.toggle('theme-day', isDay);
    body.classList.toggle('theme-night', !isDay);
    root.classList.toggle('theme-day', isDay);
    root.classList.toggle('theme-night', !isDay);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 14);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeBrandLogo = theme === 'day' ? BRAND_LOGO_DAY : BRAND_LOGO_NIGHT;

  const flipWordsList = ["Power", "Legacy", "Impact", "Conviction"];

  const filteredAchievements = achievementFilter === 'All' 
    ? ACHIEVEMENTS_DATA 
    : ACHIEVEMENTS_DATA.filter(item => item.category === achievementFilter);

  return (
    <div className={`relative min-h-screen transition-colors duration-700 selection:bg-blue-500/30 selection:text-white ${theme === 'day' ? 'theme-day text-slate-900' : 'text-slate-100'}`}>
      
      {/* =====================================================================
          BACKGROUND VIDEOS: Guaranteed Edge-to-Edge Coverage
      ====================================================================== */}
      <div className="bg-video-container" aria-hidden="true">
        {/* Night Dramatic Ambient Video */}
        <video
          ref={nightVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="bg-video"
          style={{ opacity: theme === 'night' ? 1 : 0 }}
        >
          <source src="https://res.cloudinary.com/dz7ulk8lb/video/upload/v1792502122/11727447-hd_1920_1080_24fps-compressed_rvlc2d.mp4" type="video/mp4" />
        </video>

        {/* Day Atmospheric Ambient Video */}
        <video
          ref={dayVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="bg-video"
          style={{ opacity: theme === 'day' ? 1 : 0 }}
        >
          <source src="https://res.cloudinary.com/dz7ulk8lb/video/upload/v1792501946/2865145-hd_1920_1080_30fps-compressed_ltbcwk.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Cinematic Contrast Scrim (Translucent, maintains video visibility) */}
      <div className="video-overlay-scrim" aria-hidden="true" />

      {/* =====================================================================
          COMPACT NAVBAR WITH GLASS BACKDROP ONLY AFTER SCROLL
      ====================================================================== */}
      <nav className={`roof-navbar ${isScrolled ? 'roof-navbar-scrolled' : ''}`}>
        <div className={`mx-auto flex h-11 sm:h-12 items-center justify-between px-3 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'max-w-[960px] rounded-2xl border border-white/10 bg-white/8 shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl [-webkit-backdrop-filter:blur(16px)] mt-2' : 'max-w-7xl rounded-none border-transparent bg-transparent shadow-none backdrop-blur-none'}`}>
          
          {/* Brand: Standalone PNG Crest (No Box, No Border) + Compact Typography */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none text-left py-0.5 px-0.5"
          >
            <img 
              src={activeBrandLogo}
              alt="MGBSDC Crest" 
              className="h-8 w-8 sm:h-8.5 sm:w-8.5 object-contain shrink-0 drop-shadow-sm select-none transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span className={`text-xs sm:text-[13px] font-extrabold tracking-wider transition-colors font-hero leading-tight ${theme === 'day' ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'}`}>
                MGBSDC
              </span>
              <span className={`text-[8px] sm:text-[8.5px] uppercase font-mono tracking-widest leading-none mt-0.5 ${theme === 'day' ? 'text-slate-600' : 'text-slate-400'}`}>
                Est. 1996 • 30 Years
              </span>
            </div>
          </button>

          {/* Desktop Nav: Compact Clean Buttons (Home, About, Events, Credits) - NO SUBHEADINGS */}
          <div className="hidden lg:flex items-center gap-1 font-nav text-[11px] sm:text-xs font-semibold">
            
            {/* 1. Home */}
            <button 
              onClick={() => navigateTo('home')} 
              className={`px-2.5 py-1 rounded-md transition-all ${activeTab === 'home' ? (theme === 'day' ? 'bg-slate-900/10 text-blue-900 font-bold shadow-xs' : 'bg-white/12 text-white font-bold shadow-xs') : (theme === 'day' ? 'text-slate-800 hover:text-blue-600 hover:bg-black/5' : 'text-slate-300 hover:text-white hover:bg-white/5')}`}
            >
              Home
            </button>

            {/* 2. About Dropdown (NO Subheadings!) */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button 
                onClick={() => setAboutDropdownOpen(prev => !prev)}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${['leadership', 'hall-of-fame', 'executive-committee', 'past-ec'].includes(activeTab) ? (theme === 'day' ? 'bg-slate-900/10 text-blue-900 font-bold shadow-xs' : 'bg-white/12 text-white font-bold shadow-xs') : (theme === 'day' ? 'text-slate-800 hover:text-blue-600 hover:bg-black/5' : 'text-slate-300 hover:text-white hover:bg-white/5')}`}
              >
                <span>About</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {aboutDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full left-0 mt-1.5 w-48 p-1.5 rounded-xl border shadow-xl nav-dropdown-glass z-50 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}
                  >
                    <button
                      onClick={() => navigateTo('leadership')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'leadership' ? 'bg-blue-600/25 text-blue-400 font-bold' : (theme === 'day' ? 'hover:bg-slate-900/10 text-slate-800 hover:text-blue-600' : 'hover:bg-white/12 text-slate-200 hover:text-white')}`}
                    >
                      Leadership & Council
                    </button>

                    <button
                      onClick={() => navigateTo('hall-of-fame')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'hall-of-fame' ? 'bg-blue-600/25 text-blue-400 font-bold' : (theme === 'day' ? 'hover:bg-slate-900/10 text-slate-800 hover:text-blue-600' : 'hover:bg-white/12 text-slate-200 hover:text-white')}`}
                    >
                      Hall of Honor
                    </button>

                    <button
                      onClick={() => navigateTo('executive-committee')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'executive-committee' || activeTab === 'past-ec' ? 'bg-blue-600/25 text-blue-400 font-bold' : (theme === 'day' ? 'hover:bg-slate-900/10 text-slate-800 hover:text-blue-600' : 'hover:bg-white/12 text-slate-200 hover:text-white')}`}
                    >
                      Executive Committee
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Events Dropdown (NO Subheadings!) */}
            <div 
              className="relative"
              onMouseEnter={() => setEventsDropdownOpen(true)}
              onMouseLeave={() => setEventsDropdownOpen(false)}
            >
              <button 
                onClick={() => setEventsDropdownOpen(prev => !prev)}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${['events', 'achievements', 'proddot'].includes(activeTab) ? (theme === 'day' ? 'bg-slate-900/10 text-blue-900 font-bold shadow-xs' : 'bg-white/12 text-white font-bold shadow-xs') : (theme === 'day' ? 'text-slate-800 hover:text-blue-600 hover:bg-black/5' : 'text-slate-300 hover:text-white hover:bg-white/5')}`}
              >
                <span>Events</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${eventsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {eventsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full left-0 mt-1.5 w-50 p-1.5 rounded-xl border shadow-xl nav-dropdown-glass z-50 ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}
                  >
                    <button
                      onClick={() => navigateTo('events')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'events' ? 'bg-blue-600/25 text-blue-400 font-bold' : (theme === 'day' ? 'hover:bg-slate-900/10 text-slate-800 hover:text-blue-600' : 'hover:bg-white/12 text-slate-200 hover:text-white')}`}
                    >
                      Tournaments & Memories
                    </button>

                    <button
                      onClick={() => navigateTo('achievements')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'achievements' ? 'bg-blue-600/25 text-blue-400 font-bold' : (theme === 'day' ? 'hover:bg-slate-900/10 text-slate-800 hover:text-blue-600' : 'hover:bg-white/12 text-slate-200 hover:text-white')}`}
                    >
                      Achievements Vault
                    </button>

                    <button
                      onClick={() => navigateTo('proddot')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold font-bengali transition-all ${activeTab === 'proddot' ? 'bg-blue-600/25 text-blue-400 font-bold' : (theme === 'day' ? 'hover:bg-slate-900/10 text-slate-800 hover:text-blue-600' : 'hover:bg-white/12 text-slate-200 hover:text-white')}`}
                    >
                      প্রদ্যোত (Proddot)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Credits */}
            <button 
              onClick={() => navigateTo('credits')} 
              className={`px-2.5 py-1 rounded-md transition-all ${activeTab === 'credits' ? (theme === 'day' ? 'bg-slate-900/10 text-blue-900 font-bold shadow-xs' : 'bg-white/12 text-white font-bold shadow-xs') : (theme === 'day' ? 'text-slate-800 hover:text-blue-600 hover:bg-black/5' : 'text-slate-300 hover:text-white hover:bg-white/5')}`}
            >
              Credits
            </button>

          </div>

          {/* Right Action: Icon-Only Theme Toggle, Smaller CTA, and Mobile Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Pure Icon Day/Night Toggle (Compact) */}
            <button
              onClick={toggleTheme}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${theme === 'day' ? 'bg-slate-900/5 hover:bg-slate-900/10 text-amber-600 border border-slate-900/10 shadow-xs' : 'bg-white/8 hover:bg-white/15 text-blue-300 border border-white/15 shadow-xs'}`}
              title={theme === 'day' ? "Switch to Night Mode" : "Switch to Day Mode"}
              aria-label="Toggle Day and Night mode"
            >
              {theme === 'day' ? <Sun className="w-3 h-3 fill-amber-500 text-amber-500" /> : <Moon className="w-3 h-3 text-blue-300 fill-blue-300" />}
            </button>

            {/* Glowing Luminous Frosted Glass CTA (Smaller) */}
            <a
              href="https://hymglpkvb5.zite.so"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-cta hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold"
            >
              <span>Join Us</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Redesigned Mobile Menu Toggle Button: STRICTLY HIDDEN ON DESKTOP */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className={`mobile-menu-button ${theme === 'day' ? 'text-slate-800' : 'text-white'}`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-blue-400" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Completely Redesigned Sleek Professional Mobile Menu Interface */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:hidden px-3 pt-1 pb-4 font-nav text-sm ${theme === 'day' ? 'text-slate-900' : 'text-white'}`}
            >
              <div className="mobile-nav-panel rounded-2xl p-4 shadow-2xl border space-y-3.5">
                
                {/* Mobile Drawer Header: Standalone Logo & Switch */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={activeBrandLogo}
                      alt="MGBSDC Crest"
                      className="h-8 w-8 object-contain shrink-0 drop-shadow-sm"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold font-hero tracking-wider">MGBSDC Portal</span>
                      <span className="text-[9px] font-mono opacity-65 tracking-widest uppercase">Est. 1996 • 30 Years</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleTheme}
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1.5 bg-white/8 hover:bg-white/15 border border-white/15 transition-all"
                    >
                      {theme === 'day' ? <Sun className="w-3 h-3 text-amber-500 fill-amber-500" /> : <Moon className="w-3 h-3 text-blue-300 fill-blue-300" />}
                      <span className="font-semibold">{theme === 'day' ? 'Day' : 'Night'}</span>
                    </button>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/8 hover:bg-white/15 border border-white/15 text-slate-300 hover:text-white"
                      aria-label="Close menu"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Professional Single-Column Navigation List with Clean Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-left">
                  {[
                    { id: 'home', label: 'Home Overview', icon: Compass },
                    { id: 'leadership', label: 'Leadership & Council', icon: Shield },
                    { id: 'hall-of-fame', label: 'Hall of Honor (1926–2023)', icon: Crown },
                    { id: 'executive-committee', label: 'Executive Committee & Past EC', icon: Users },
                    { id: 'events', label: 'Tournaments & Memories', icon: Calendar },
                    { id: 'achievements', label: 'Achievements Vault', icon: Trophy },
                    { id: 'proddot', label: 'প্রদ্যোত (Proddot Magazine)', icon: BookOpen, bengali: true },
                    { id: 'credits', label: 'Platform Credits', icon: Code },
                  ].map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id || (item.id === 'executive-committee' && activeTab === 'past-ec');
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigateTo(item.id as PageTab)}
                        className={`w-full px-3 py-2 rounded-xl text-left transition-all flex items-center justify-between group ${
                          isActive 
                            ? 'bg-blue-600/25 border border-blue-400/35 text-white font-bold shadow-xs' 
                            : (theme === 'day' ? 'hover:bg-slate-100 text-slate-800 hover:text-blue-600' : 'hover:bg-white/8 text-slate-200 hover:text-white')
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-blue-400' : (theme === 'day' ? 'text-slate-500 group-hover:text-blue-600' : 'text-slate-400 group-hover:text-blue-400')}`} />
                          <span className={`text-xs ${item.bengali ? 'font-bengali font-bold' : 'font-medium'}`}>{item.label}</span>
                        </div>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Actions Bottom */}
                <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                  <a
                    href="https://hymglpkvb5.zite.so"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass-cta w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-center text-xs font-bold shadow-md"
                  >
                    <span>Apply to Join MGBSDC</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.facebook.com/mgbsdc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook-link-btn w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-center text-[11px] font-semibold"
                  >
                    <span>Official Facebook Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* =====================================================================
          MAIN CONTENT AREA
      ====================================================================== */}
      <main className="relative z-10 pt-16">

        {/* -------------------------------------------------------------------
            1. HOME PAGE VIEW
        -------------------------------------------------------------------- */}
        {activeTab === 'home' && (
          <div className="relative">
            {/* Hero Section: Spacious, Bold, Left-Aligned with 30 Years of Glory */}
            <section className="relative min-h-[82vh] flex items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <div className="max-w-5xl mx-auto w-full space-y-8 text-left">
                
                {/* 30 Years of Glory Est. Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium glass-panel">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className={theme === 'day' ? 'text-slate-800 font-semibold' : 'text-slate-200'}>
                    Est. 1996 • 30 Years of Glory
                  </span>
                </div>

                {/* Clean, Aesthetic Heading with Aceternity FlipWords & HeroHighlight */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-hero tracking-tight leading-[1.12] font-bold max-w-3xl drop-shadow-md">
                  Where Words Become{" "}
                  <Highlight className="mt-1 shadow-md">
                    <FlipWords words={flipWordsList} className="font-bold text-white tracking-wide" />
                  </Highlight>
                </h1>

                <p className={`text-base sm:text-xl max-w-2xl leading-relaxed ${theme === 'day' ? 'text-slate-800 font-medium' : 'text-slate-200'}`}>
                  Motijheel Government Boys' School Debating Club. Forging national champions, master orators, and intellectual leaders through three decades of logic, parliamentary debating, and eloquence.
                </p>

                {/* Action Buttons with Real Glassmorphism */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="https://hymglpkvb5.zite.so"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass-cta inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-xl"
                  >
                    <span>Join the Club</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => navigateTo('events')}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold glass-panel transition-all ${theme === 'day' ? 'text-slate-800 hover:bg-white/60' : 'text-white hover:bg-white/20'}`}
                  >
                    <span>Explore Tournaments</span>
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  </button>

                  <button
                    onClick={() => navigateTo('achievements')}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold glass-panel transition-all ${theme === 'day' ? 'text-slate-800 hover:bg-white/60' : 'text-white hover:bg-white/20'}`}
                  >
                    <span>Trophy Vault</span>
                    <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>

                {/* Animated Stat Tickers in Pure Glass */}
                <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg">
                  <div className="glass-card p-4 rounded-2xl text-center">
                    <div className="text-3xl font-extrabold font-mono text-blue-400">{yearsCount}</div>
                    <div className={`text-[11px] font-mono uppercase tracking-wider mt-1 ${theme === 'day' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>Years of Glory</div>
                  </div>
                  <div className="glass-card p-4 rounded-2xl text-center">
                    <div className="text-3xl font-extrabold font-mono text-indigo-400">{nationalsCount}</div>
                    <div className={`text-[11px] font-mono uppercase tracking-wider mt-1 ${theme === 'day' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>Nationals Held</div>
                  </div>
                  <div className="glass-card p-4 rounded-2xl text-center">
                    <div className="text-3xl font-extrabold font-mono text-cyan-400">{trophiesCount}+</div>
                    <div className={`text-[11px] font-mono uppercase tracking-wider mt-1 ${theme === 'day' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>Trophies Won</div>
                  </div>
                </div>

              </div>
            </section>

            {/* =================================================================
                THE STORY & HERITAGE (Clean image: NO text clutter)
            ================================================================== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
              <div className="max-w-7xl mx-auto space-y-16">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                    Est. 1996 • 30 Years of Unbroken Oratory
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-hero font-extrabold tracking-tight">
                    The Legacy of Excellence
                  </h2>
                  <p className={`text-sm sm:text-base leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    The storied journey of Motijheel Government Boys' School Debating Club — nurturing critical minds, national speakers, and parliamentary champions.
                  </p>
                </div>

                {/* Narrative & Clean Photo */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  
                  {/* Left Column: Historical Narrative */}
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold font-hero text-blue-400">
                      From A Humble Classroom Spark to A National Titan
                    </h3>
                    
                    <p className={`text-sm sm:text-base leading-relaxed ${theme === 'day' ? 'text-slate-800' : 'text-slate-200'}`}>
                      In <strong>1996</strong>, within the red-brick heritage corridors of Motijheel Government Boys' School, a handful of devoted teachers and passionate students sparked a quiet revolution. Disillusioned with passive memorization, they sought an arena where young minds could question assumptions, deconstruct dogma, and defend truth through the fire of logical inquiry.
                    </p>

                    <p className={`text-sm sm:text-base leading-relaxed ${theme === 'day' ? 'text-slate-800' : 'text-slate-200'}`}>
                      What began as spirited parliamentary exercises during afternoon recess quickly evolved into a debating powerhouse. Within a decade, MGBSDC had clinched championship titles at prestigious BTV national telecast debates, inter-school cups, and inter-district invitationals.
                    </p>

                    <p className={`text-sm sm:text-base leading-relaxed ${theme === 'day' ? 'text-slate-800' : 'text-slate-200'}`}>
                      Today, having organized <strong>18 hallmark National Debate Festivals</strong>, MGBSDC stands at <strong>30 years of glory</strong>. We train orators across three classical formats: <em>Bangla Parliamentary</em>, <em>English World Schools Debating Championship (WSDC/BP)</em>, and traditional <em>Barowari</em> public speaking.
                    </p>

                    {/* Clean Milestone Strip in Translucent Glass */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="glass-card p-3.5 rounded-xl text-left">
                        <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">1996 Genesis</span>
                        <h4 className="text-xs font-bold font-hero mt-0.5">Founded at MGBS</h4>
                        <p className={`text-[11px] mt-1 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>Pioneered by mentors & students dedicated to dialectic logic.</p>
                      </div>
                      <div className="glass-card p-3.5 rounded-xl text-left">
                        <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">Circuit Dominance</span>
                        <h4 className="text-xs font-bold font-hero mt-0.5">500+ Championships</h4>
                        <p className={`text-[11px] mt-1 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>Dominating national podiums across BTV, NDDC, and DRMC festivals.</p>
                      </div>
                      <div className="glass-card p-3.5 rounded-xl text-left">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">18 Nationals</span>
                        <h4 className="text-xs font-bold font-hero mt-0.5">National Arena</h4>
                        <p className={`text-[11px] mt-1 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>Welcoming 120+ top schools & colleges each competitive season.</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Clean Image Card */}
                  <div className="lg:col-span-5 relative">
                    <div className="glass-panel-deep p-3 rounded-3xl shadow-2xl relative overflow-hidden group">
                      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/20">
                        <img
                          src="https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895652/Them_rb9sod.jpg"
                          alt="MGBSDC Debaters"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* The 4 Foundational Pillars */}
                <div className="space-y-6 pt-4">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-bold">Foundations</span>
                    <h3 className="text-2xl font-bold font-hero">The Four Pillars of Our Craft</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="glass-card p-6 rounded-2xl text-left space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg border border-blue-400/30">
                        🎯
                      </div>
                      <h4 className="text-base font-bold font-hero">Dialectic Logic</h4>
                      <p className={`text-xs leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                        Rigorous dissection of economic, geopolitical, and moral motions with empirical evidence and structured argumentation.
                      </p>
                    </div>

                    <div className="glass-card p-6 rounded-2xl text-left space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-400/30">
                        🗣️
                      </div>
                      <h4 className="text-base font-bold font-hero">Commanding Oratory</h4>
                      <p className={`text-xs leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                        Vocal projection, rhythmic cadence, and psychological persuasion that captivate audiences and adjudicators alike.
                      </p>
                    </div>

                    <div className="glass-card p-6 rounded-2xl text-left space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-400/30">
                        ⚖️
                      </div>
                      <h4 className="text-base font-bold font-hero">Democratic Ethics</h4>
                      <p className={`text-xs leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                        Unshakable sportsmanship, intellectual humility, and the grace to listen deeply to opposing viewpoints.
                      </p>
                    </div>

                    <div className="glass-card p-6 rounded-2xl text-left space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-400/30">
                        🤝
                      </div>
                      <h4 className="text-base font-bold font-hero">Sacred Mentorship</h4>
                      <p className={`text-xs leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                        A 30-year unbroken tradition where alumni and seniors return weekly to coach, spar, and elevate the next generation.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* =================================================================
                PRESTIGIOUS COUNCIL (Freestanding cutout figures, NOT IN A BOX!)
            ================================================================== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-mono tracking-widest text-blue-400 uppercase font-bold">Mentorship & Stewardship</span>
                  <h2 className="text-3xl font-hero font-extrabold tracking-tight">The Council</h2>
                  <p className={`text-sm sm:text-base ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    Distinguished educators and moderators whose guidance, wisdom, and institutional direction elevate the club.
                  </p>
                </div>

                {/* 3 Council Leaders (Freestanding, pure frosted glass pedestal) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {COUNCIL_MEMBERS.map((member, i) => (
                    <div 
                      key={i} 
                      className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center group transition-all duration-300 shadow-xl"
                    >
                      <div className="pedestal-glow w-full h-52 sm:h-56 mb-4 flex items-end justify-center">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="freestanding-figure h-48 sm:h-52 w-auto max-w-full object-contain" 
                        />
                      </div>
                      <p className="text-xs font-mono font-bold text-blue-400 tracking-widest uppercase mb-1">{member.role}</p>
                      <h3 className="text-xl sm:text-2xl font-extrabold font-hero mb-3">{member.name}</h3>
                      <p className={`text-xs sm:text-sm leading-relaxed italic ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                        "{member.bio}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* =================================================================
                HOME EVENTS: NO WHITE BORDER, B&W by default, Color on Hover
            ================================================================== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono tracking-widest text-blue-400 uppercase font-bold">Happening Now</span>
                    <h2 className="text-3xl font-hero font-extrabold tracking-tight">Recent Tournaments & Events</h2>
                  </div>
                  <button 
                    onClick={() => navigateTo('events')}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold glass-panel transition-all ${theme === 'day' ? 'text-slate-800 hover:bg-white/60' : 'text-white hover:bg-white/20'}`}
                  >
                    <span>View All Glorified Events</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3 Featured Event Cards in Frosted Glass */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Event 1 */}
                  <div className="home-event-card glass-card rounded-2xl overflow-hidden group text-left">
                    <div className="event-media relative aspect-[16/10] overflow-hidden bg-black/40 rounded-xl neon-img-glow m-2">
                      <img 
                        src="https://res.cloudinary.com/dz7ulk8lb/image/upload/v1776700567/B2B_yemzwl.jpg" 
                        alt="Back 2 Back Season 2" 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600/90 backdrop-blur-md text-white border border-blue-400/40">
                        Latest
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-bold font-hero">Back 2 Back Season 2</h3>
                      <p className={`text-xs leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                        The ultimate debating showdown returns with fierce competition, British Parliamentary rounds, and brilliant minds.
                      </p>
                      <div className="pt-2">
                        <a 
                          href="https://www.facebook.com/events/1367842002023773/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:underline"
                        >
                          <span>Event Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="home-event-card glass-card rounded-2xl overflow-hidden group text-left">
                    <div className="event-media relative aspect-[16/10] overflow-hidden bg-black/40 rounded-xl neon-img-glow m-2">
                      <img 
                        src="https://res.cloudinary.com/dz7ulk8lb/image/upload/v1776700850/Debate_Beyond_Fear_tlyxz6.jpg" 
                        alt="Debate Beyond Fear" 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-600/90 backdrop-blur-md text-white border border-indigo-400/40">
                        Featured
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-bold font-hero">Debate Beyond Fear</h3>
                      <p className={`text-xs leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                        Breaking barriers and empowering voices in the face of public speaking fear and motion complexities.
                      </p>
                      <div className="pt-2">
                        <a 
                          href="https://www.facebook.com/events/5060150187542899" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:underline"
                        >
                          <span>Event Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="home-event-card glass-card rounded-2xl overflow-hidden group text-left">
                    <div className="event-media relative aspect-[16/10] overflow-hidden bg-black/40 rounded-xl neon-img-glow m-2">
                      <img 
                        src="https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895540/18th_vn4pr3.jpg" 
                        alt="18th National Debate Championship" 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-600/90 backdrop-blur-md text-white border border-cyan-400/40">
                        Flagship
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="text-lg font-bold font-hero">18th National Debate Championship</h3>
                      <p className={`text-xs leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                        Our hallmark tournament welcoming over 60 nationwide contingents for 3 days of parliamentary mastery.
                      </p>
                      <div className="pt-2">
                        <button 
                          onClick={() => navigateTo('events')}
                          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
                        >
                          <span>View Glorified Gallery</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Ready to Join Legacy CTA in Deep Frosted Glass */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
              <div className="max-w-4xl mx-auto glass-panel-deep p-8 sm:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden shadow-2xl">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg border border-blue-400/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-hero font-extrabold tracking-tight">
                  Ready to Join 30 Years of Glory?
                </h2>
                <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                  Become part of Bangladesh's most prestigious debate society and unleash the orator within you. Applications are open.
                </p>
                <div>
                  <a
                    href="https://hymglpkvb5.zite.so"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass-cta inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold shadow-xl"
                  >
                    <span>Apply Now</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* -------------------------------------------------------------------
            2. LEADERSHIP & COUNCIL PAGE VIEW
        -------------------------------------------------------------------- */}
        {activeTab === 'leadership' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono tracking-widest text-blue-400 uppercase font-bold">Executive Authority</span>
              <h1 className="text-4xl sm:text-5xl font-hero font-extrabold tracking-tight">Leadership & Council</h1>
              <p className={`text-sm sm:text-base leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                The educators, institutional patrons, and moderators whose mentorship and wisdom preserve the legacy of MGBSDC.
              </p>
            </div>

            {/* The 3 Prestigious Council Leaders (Freestanding cutout figures, pure frosted glass) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COUNCIL_MEMBERS.map((member, i) => (
                <div 
                  key={i} 
                  className="glass-card p-8 rounded-3xl flex flex-col items-center text-center group transition-all duration-300 shadow-2xl"
                >
                  <div className="pedestal-glow w-full h-56 mb-4 flex items-end justify-center">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="freestanding-figure h-52 w-auto max-w-full object-contain" 
                    />
                  </div>
                  <p className="text-xs font-mono font-bold text-blue-400 tracking-widest uppercase mb-1">{member.role}</p>
                  <h3 className="text-2xl font-extrabold font-hero mb-3">{member.name}</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed italic ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    "{member.bio}"
                  </p>
                </div>
              ))}
            </div>

            {/* Institutional Philosophy */}
            <div className="glass-panel-deep p-8 rounded-3xl space-y-4 max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-bold font-hero text-blue-400">Institutional Philosophy</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                "At Motijheel Government Boys' School Debating Club, our educators believe that eloquence without conviction is mere noise, and passion without logic lacks direction. We instill both rigor and empathy in every student who steps onto the podium."
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => navigateTo('executive-committee')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  <span>Meet the 2025 Executive Committee</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            3. ACHIEVEMENTS GALLERY (Cyan & Royal Sapphire Accents, NO ORANGE!)
        -------------------------------------------------------------------- */}
        {activeTab === 'achievements' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold">500+ Trophies & Laurels</span>
              <h1 className="text-4xl sm:text-5xl font-hero font-extrabold tracking-tight">Our Achievements</h1>
              <p className={`text-sm sm:text-base leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                A visual archive of national glory — over 500 trophies, national championships, and debate laurels earned through relentless dedication.
              </p>
            </div>

            {/* Filter Tabs in Glass */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(['All', 'Nationals', 'Championships', 'Regional'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setAchievementFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all backdrop-blur-[4px] ${achievementFilter === cat ? 'bg-cyan-500/25 text-white shadow-sm border border-cyan-400/40' : (theme === 'day' ? 'bg-white/5 border border-black/10 text-slate-800 hover:bg-white/10' : 'bg-white/5 border border-white/12 text-slate-300 hover:bg-white/10')}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 21 Achievements Gallery Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAchievements.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedLightboxImg({ url: item.url, title: item.title, subtitle: `${item.category} • ${item.year}` })}
                  className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-cyan-500/50 transition-all shadow-md flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/40 rounded-xl neon-img-glow m-2">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-600/90 backdrop-blur-md text-white border border-cyan-400/40 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between text-left">
                    <h4 className="text-sm font-bold font-hero line-clamp-1">{item.title}</h4>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2">
                      <span>MGBSDC Laurels</span>
                      <span className="text-cyan-400 font-bold">{item.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            4. HALL OF FAME: GRAND TEMPLE OF HONOR
        -------------------------------------------------------------------- */}
        {activeTab === 'hall-of-fame' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            
            {/* Temple Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold glass-panel text-amber-400 border border-amber-500/30">
                <Crown className="w-3.5 h-3.5" />
                <span>The Pantheon of Orators • Est. 1926–2023</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-hero font-extrabold tracking-tight">
                Hall of Honor
              </h1>
              <p className={`text-sm sm:text-base leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                The sacred pantheon commemorating the legendary presidents, founding secretariats, and grand orators whose eloquence and leadership laid the bedrock of MGBSDC.
              </p>
            </div>

            {/* Temple Pedestals: Exactly 2 At Once on Desktop, Clean Typography, No Slop Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {HALL_OF_FAME.map((debater, index) => {
                const auraClass = debater.auraTier === 'gold' ? 'aura-gold' : debater.auraTier === 'sapphire' ? 'aura-sapphire' : debater.auraTier === 'amethyst' ? 'aura-amethyst' : 'aura-silver';
                const hasFacebookLink = Boolean(debater.fbLink && debater.fbLink.trim() && debater.fbLink !== 'https://www.facebook.com');
                
                return (
                  <div
                    key={index}
                    className={`temple-pedestal p-8 flex flex-col items-center text-center group ${auraClass}`}
                  >
                    {/* Pedestal Stand (Freestanding figure with radiant neon light contour) */}
                    <div className="pedestal-glow w-full h-56 sm:h-60 mb-5 flex items-end justify-center relative">
                      {debater.image ? (
                        <img
                          src={debater.image}
                          alt={debater.name}
                          className="freestanding-figure h-48 sm:h-52 w-auto max-w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-40 w-full">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/20 via-blue-500/20 to-indigo-500/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shadow-xl mb-2 backdrop-blur-md">
                            <Trophy className="w-8 h-8" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">Honorary Debater Plaque</span>
                        </div>
                      )}
                    </div>

                    {/* Member Name */}
                    {debater.memorial && (
                      <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-500/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.18em] text-amber-300/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                        In Memory
                      </span>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold font-hero mb-1.5 leading-snug">
                      {debater.name}
                    </h3>

                    {/* Position with strictly unified year formatting (never breaks 2005 on one line and 2006 on another) */}
                    <p className={`text-xs font-mono ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'} mb-4 flex flex-wrap items-center justify-center gap-x-1.5 text-center leading-relaxed`}>
                      {debater.position.includes('(') ? (
                        <>
                          <span>{debater.position.split('(')[0].trim()}</span>
                          <span className="whitespace-nowrap font-semibold text-blue-400">({debater.position.split('(')[1]}</span>
                        </>
                      ) : (
                        <span className="whitespace-nowrap">{debater.position}</span>
                      )}
                    </p>

                    {hasFacebookLink && (
                      <div className="mt-auto pt-3 border-t border-white/10 w-full flex justify-center">
                        <a
                          href={debater.fbLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="facebook-link-btn"
                        >
                          <span>Facebook</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sacred Inscription */}
            <div className="glass-panel-deep p-8 rounded-3xl border-amber-500/20 max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                The Temple Oath
              </span>
              <p className={`text-xs sm:text-sm italic leading-relaxed ${theme === 'day' ? 'text-slate-800' : 'text-slate-300'}`}>
                "Honor given where honor was won. These names stand permanently inscribed within the annals of Motijheel Government Boys' School Debating Club. Their arguments echoed in packed auditoriums, and their legacy lives forever in our podiums."
              </p>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------------
            5. EVENTS PAGE: VIBRANT, GLORIFIED, FULL OF COLOR & MEMORIES
        -------------------------------------------------------------------- */}
        {activeTab === 'events' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono tracking-widest text-blue-400 uppercase font-bold">Championships, Festivals & Memories</span>
              <h1 className="text-4xl sm:text-5xl font-hero font-extrabold tracking-tight">Events & Memories</h1>
              <p className={`text-sm sm:text-base leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                Every tournament is an unforgettable chapter in our lives. Celebrated in glorious, vibrant color — click any photo to view in high definition.
              </p>
            </div>

            {/* Glorified Events Grid in Pure Translucent Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EVENT_GALLERY.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedLightboxImg({ url: event.url, title: event.title, subtitle: `${event.subtitle} (${event.date})` })}
                  className="event-item-glorified glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-blue-500/50 transition-all shadow-xl flex flex-col text-left"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/40 rounded-xl neon-img-glow m-2">
                    <img
                      src={event.url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-600/90 backdrop-blur-md text-white border border-blue-400/40 shadow-md">
                      {event.date}
                    </span>

                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-white/30">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold font-hero leading-snug">{event.title}</h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                        {event.subtitle}
                      </p>
                    </div>
                    <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-blue-400">
                      <span>View Full Resolution</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            6. EXECUTIVE COMMITTEE (2025 Cabinet & Complete Past ECs)
        -------------------------------------------------------------------- */}
        {(activeTab === 'executive-committee' || activeTab === 'past-ec') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono tracking-widest text-blue-400 uppercase font-bold">Leadership Roster</span>
              <h1 className="text-4xl sm:text-5xl font-hero font-extrabold tracking-tight">Executive Committee</h1>
              <p className={`text-sm sm:text-base leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                The driving minds behind tournament logistics, debates, publications, and club governance.
              </p>
            </div>

            {/* Toggle between Current 2025 EC and Past ECs */}
            <div className="flex justify-center">
              <div className="glass-panel p-1.5 rounded-2xl flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('executive-committee')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'executive-committee' ? (theme === 'day' ? 'bg-blue-600/20 backdrop-blur-[4px] text-blue-900 border border-blue-500/30 shadow-sm' : 'bg-white/10 backdrop-blur-[4px] text-white border border-white/20 shadow-sm') : (theme === 'day' ? 'text-slate-800 hover:bg-black/5' : 'text-slate-300 hover:text-white hover:bg-white/5')}`}
                >
                  2025 Executive Committee
                </button>
                <button
                  onClick={() => setActiveTab('past-ec')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'past-ec' ? (theme === 'day' ? 'bg-blue-600/20 backdrop-blur-[4px] text-blue-900 border border-blue-500/30 shadow-sm' : 'bg-white/10 backdrop-blur-[4px] text-white border border-white/20 shadow-sm') : (theme === 'day' ? 'text-slate-800 hover:bg-black/5' : 'text-slate-300 hover:text-white hover:bg-white/5')}`}
                >
                  Past Executive Committees
                </button>
              </div>
            </div>

            {/* Current 2025 Committee (Freestanding figures, NO BOX!) */}
            {activeTab === 'executive-committee' && (
              <div className="space-y-12">
                {/* Featured President & GS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {EC_2025.filter(m => m.featured).map((leader, i) => (
                    <div
                      key={i}
                      className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center group hover:border-blue-500/50 shadow-xl"
                    >
                      <div className="pedestal-glow w-full h-52 mb-3 flex items-end justify-center">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="freestanding-figure h-48 w-auto max-w-full object-contain"
                        />
                      </div>
                      <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.18em] whitespace-pre-line leading-relaxed">{leader.role}</div>
                      <h3 className="text-xl font-bold font-hero mt-1 mb-2">{leader.name}</h3>
                      {leader.fbLink && (
                        <a
                          href={leader.fbLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="facebook-link-btn mt-auto"
                        >
                          <span>Facebook</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Rest of EC Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {EC_2025.filter(m => !m.featured).map((leader, i) => (
                    <div
                      key={i}
                      className="glass-card p-5 rounded-2xl flex flex-col items-center text-center group hover:scale-[1.02] transition-all shadow-md"
                    >
                      <div className="pedestal-glow w-full h-40 mb-2 flex items-end justify-center">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="freestanding-figure h-36 w-auto max-w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-[10px] font-mono font-semibold text-blue-400 mb-1 whitespace-pre-line leading-relaxed tracking-[0.18em] uppercase">{leader.role}</div>
                      <h4 className="text-sm font-bold font-hero mb-2">{leader.name}</h4>
                      {leader.fbLink && (
                        <a
                          href={leader.fbLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="facebook-link-btn mt-auto"
                        >
                          <span>Facebook</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* Complete Past Executive Committees Roster */}
            {activeTab === 'past-ec' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PAST_EC_DATA.map((ec, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-2xl space-y-4 text-left shadow-lg">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold font-hero text-blue-400">{ec.year}</h3>
                      <span className="text-xs font-mono text-slate-400">{ec.members.length} Officers</span>
                    </div>
                    <ul className="space-y-2 text-xs">
                      {ec.members.map((m, mIdx) => (
                        <li key={mIdx} className="flex justify-between items-baseline gap-2">
                          <span className={`font-semibold ${theme === 'day' ? 'text-slate-700' : 'text-slate-400'}`}>{m.role}</span>
                          <span className="font-bold text-right">{m.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------
            7. PRODDOT (প্রদ্যোত) MAGAZINE PAGE VIEW
        -------------------------------------------------------------------- */}
        {activeTab === 'proddot' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono tracking-widest text-blue-400 uppercase font-bold">Official Publication</span>
              <h1 className="text-5xl sm:text-6xl font-bengali font-bold tracking-tight">প্রদ্যোত</h1>
              <p className={`text-sm sm:text-base leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                The literary and analytical voice of MGBSDC — celebrating debating essays, tournament memoirs, and intellectual rhetoric.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Magazine Cover */}
              <div className="relative group max-w-md mx-auto">
                <div className="glass-panel-deep p-4 rounded-3xl shadow-2xl relative overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dwposiqyd/image/upload/q_auto/f_auto/v1780895686/Proddot_as1xtx.jpg"
                    alt="Proddot Magazine Cover"
                    className="w-full h-auto rounded-2xl shadow-xl group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-blue-400">Published by MGBSDC</span>
                      <h4 className="font-bengali font-bold text-base">প্রদ্যোত সংকলন</h4>
                    </div>
                    <button
                      onClick={() => setReadingModalOpen(true)}
                      className="btn-glass-cta px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Read Preview
                    </button>
                  </div>
                </div>
              </div>

              {/* Magazine Details */}
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium glass-panel text-blue-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Annual Literary Edition</span>
                </div>

                <h2 className="text-3xl font-hero font-extrabold tracking-tight">
                  Where Rhetoric Meets the Written Word
                </h2>

                <p className={`text-sm leading-relaxed ${theme === 'day' ? 'text-slate-800' : 'text-slate-300'}`}>
                  Welcome to <strong className="font-bengali">প্রদ্যোত (Proddot)</strong>, the hallmark publication of MGBSDC. Containing insightful motion analyses, debate theory, interviews with national best speakers, and philosophical reflections.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="glass-card p-4 rounded-xl">
                    <h4 className="font-bold text-blue-400 text-sm mb-1">Insightful Critiques</h4>
                    <p className={`text-xs ${theme === 'day' ? 'text-slate-700' : 'text-slate-400'}`}>Deep dives into parliamentary motions, logic fallacies, and case building.</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl">
                    <h4 className="font-bold text-indigo-400 text-sm mb-1">Inspiring Profiles</h4>
                    <p className={`text-xs ${theme === 'day' ? 'text-slate-700' : 'text-slate-400'}`}>Chronicles of alumni debaters and national champion speaker journeys.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setReadingModalOpen(true)}
                    className="btn-glass-cta inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold shadow-lg"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open Reader Preview</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            8. CREDITS PAGE
        -------------------------------------------------------------------- */}
        {activeTab === 'credits' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                Technical Architecture & Engineering
              </span>
              <h1 className="text-4xl sm:text-5xl font-hero font-extrabold tracking-tight">
                Credits
              </h1>
              <p className={`text-sm leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                Designed and built with precision to honor the 30-year legacy of Motijheel Government Boys' School Debating Club.
              </p>
            </div>

            {/* Clean, Masculine, Professional Developer Card */}
            <div className="glass-panel-deep p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Freestanding Cutout of Araf */}
                <div className="md:col-span-5 flex flex-col items-center text-center">
                  <div className="pedestal-glow w-full h-56 flex items-end justify-center mb-4">
                    <img
                      src="https://res.cloudinary.com/dz7ulk8lb/image/upload/v1792714419/image_ef1581ea__1_-removebg-preview_1_ibjm6b.png"
                      alt="Araf Al Samin - Web Developer"
                      className="freestanding-figure h-52 w-auto max-w-full object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-hero font-extrabold">Araf Al Samin</h2>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-blue-400">
                      Vice President
                    </p>
                    <p className="mt-1 text-[10px] tracking-[0.2em] text-blue-400/80 lowercase">
                      Press &amp; Publications
                    </p>
                  </div>

                  <div className="pt-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61570414709460"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glass-cta inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      <span>Connect on Facebook</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Straightforward Specifications & Tech Roster */}
                <div className="md:col-span-7 space-y-4 text-left border-t md:border-t-0 md:border-l border-white/10 md:pl-8 pt-6 md:pt-0">
                  <h3 className="text-lg font-bold font-hero text-blue-400">
                    Platform Engineering
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    Handcrafted to document and preserve thirty years of oratorical prominence, tournament achievements, and debating history for MGBSDC debaters and alumni worldwide.
                  </p>

                  <div className="space-y-2 pt-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className={theme === 'day' ? 'text-slate-600' : 'text-slate-400'}>Frontend Architecture</span>
                      <span className="font-semibold">React 19, TypeScript, Tailwind CSS v4</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className={theme === 'day' ? 'text-slate-600' : 'text-slate-400'}>Motion & Interaction</span>
                      <span className="font-semibold">Motion (Framer), Spring Physics</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className={theme === 'day' ? 'text-slate-600' : 'text-slate-400'}>Asset CDN</span>
                      <span className="font-semibold">Cloudinary Optimized Media</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className={theme === 'day' ? 'text-slate-600' : 'text-slate-400'}>Tenure</span>
                      <span className="font-semibold">2025 Executive Session</span>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-slate-400">
                    Motijheel Government Boys' School Debating Club • Dhaka, Bangladesh
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* =====================================================================
          IMAGE LIGHTBOX MODAL (For Achievements & Events)
      ====================================================================== */}
      <AnimatePresence>
        {selectedLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-backdrop p-4 sm:p-8"
            onClick={() => setSelectedLightboxImg(null)}
          >
            <div 
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedLightboxImg(null)}
                className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedLightboxImg.url}
                alt={selectedLightboxImg.title}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain border-2 border-cyan-400/80 shadow-[0_0_35px_rgba(56,189,248,0.6),0_0_70px_rgba(59,130,246,0.35)]"
              />
              <div className="mt-3 text-center">
                <h4 className="text-white text-base font-bold font-hero">{selectedLightboxImg.title}</h4>
                {selectedLightboxImg.subtitle && (
                  <p className="text-xs text-slate-300 font-mono mt-0.5">{selectedLightboxImg.subtitle}</p>
                )}
                <a
                  href={selectedLightboxImg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1 mt-1 font-mono"
                >
                  <span>Open High-Resolution Original</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          PRODDOT READING MODAL
      ====================================================================== */}
      <AnimatePresence>
        {readingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-backdrop p-4 sm:p-8"
            onClick={() => setReadingModalOpen(false)}
          >
            <div
              className="glass-panel-deep p-6 sm:p-8 rounded-3xl border border-white/20 max-w-2xl w-full text-left space-y-4 max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-bold font-bengali">প্রদ্যোত — ডিজিটাল সংকলন</h3>
                </div>
                <button onClick={() => setReadingModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-sm leading-relaxed">
                <p>
                  স্বাগতম <strong>প্রদ্যোত</strong>-এর ডিজিটাল আর্কাইভে। মতিঝিল সরকারি বালক উচ্চ বিদ্যালয় বিতর্ক আন্দোলনের গৌরবময় ইতিহাস এবং আমাদের বিতার্কিকদের মননশীল লেখার এক অনন্য দলিল।
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-bold text-blue-400 text-xs uppercase font-mono">নির্বাচিত প্রবন্ধসমূহ</h4>
                  <ul className="list-disc list-inside text-xs space-y-1 text-slate-300">
                    <li>সংসদীয় বিতর্কের গতিশীল রূপরেখা ও যুক্তি-তর্ক</li>
                    <li>বিতার্কিক থেকে আগামীর নীতিনির্ধারক — পথচলার গল্প</li>
                    <li>জাতীয় বিতর্ক প্রতিযোগিতার গৌরবগাথা ও স্মৃতিকথা</li>
                  </ul>
                </div>
                <p className="text-xs text-slate-400 italic">
                  "শব্দই শক্তি, যুক্তিই পথ" — প্রদ্যোত বহন করে চলেছে এক অনন্য চেতনা।
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setReadingModalOpen(false)}
                  className="btn-glass-cta px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          EXPANSIVE, ACCESSIBLE INSTITUTIONAL FOOTER (DAY & NIGHT)
      ====================================================================== */}
      <footer
        className={`day-mode-footer mt-24 border-t transition-colors duration-500 ${theme === 'day' ? 'theme-day-footer' : 'theme-night-footer'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
          
          {/* Main Multi-Column Institutional Matrix (Accessible Links Only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 text-left">
            
            {/* Column 1: Institutional Identity */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={activeBrandLogo}
                  alt="MGBSDC Crest"
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain shrink-0 drop-shadow-md select-none transition-transform hover:scale-105"
                />
                <div>
                  <h3 className="text-lg font-bold font-hero tracking-wider">MGBSDC</h3>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'day' ? 'text-slate-600' : 'text-slate-400'}`}>
                    Est. 1996 • 30 Years of Glory
                  </span>
                </div>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed max-w-sm ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                Motijheel Government Boys' School Debating Club is Bangladesh's hallmark school debating institution, fostering generations of national champions, critical thinkers, and parliamentary orators.
              </p>
              <div className={`text-xs font-mono space-y-1 ${theme === 'day' ? 'text-slate-600' : 'text-slate-400'}`}>
                <div>Affiliation: Motijheel Govt. Boys' High School</div>
                <div>Campus: Outer Circular Road, Motijheel, Dhaka-1000</div>
              </div>
            </div>

            {/* Column 2: Club & Leadership */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">Club & Leadership</h4>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <button onClick={() => navigateTo('home')} className={`hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span>Home Overview</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('leadership')} className={`hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span>Council of Mentors</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('hall-of-fame')} className={`hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span>Hall of Honor (1926–2023)</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('executive-committee')} className={`hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span>2025 Executive Committee</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('past-ec')} className={`hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span>Past Executive Tenures</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Events & Archives */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">Events & Archives</h4>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <button onClick={() => navigateTo('events')} className={`hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span>Tournaments & Memories</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('achievements')} className={`hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span>Achievements Vault</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('proddot')} className={`hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 font-bengali ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span>প্রদ্যোত প্রকাশনা</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('credits')} className={`hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span>Platform Credits</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Official Connect */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">Official Connect</h4>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <a
                    href="https://www.facebook.com/mgbsdc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}
                  >
                    <span>Facebook Page</span>
                    <ExternalLink className="w-3 h-3 text-blue-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://hymglpkvb5.zite.so"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 ${theme === 'day' ? 'text-slate-700' : 'text-slate-300'}`}
                  >
                    <span>Apply for Membership</span>
                    <ArrowUpRight className="w-3 h-3 text-blue-400" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Deep Metadata & System Telemetry Strip */}
          <div className={`pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono ${theme === 'day' ? 'border-slate-300 text-slate-600' : 'border-white/10 text-slate-400'}`}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center md:text-left">
              <span>© 2025 Motijheel Govt. Boys' School Debating Club</span>
              <span>•</span>
              <span>All Rights Reserved</span>
              <span>•</span>
              <span>Motto: "Where Words Become Power"</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-400 font-bold">Session 2025–2026</span>
              <span>•</span>
              <span>30th Anniversary Edition</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
