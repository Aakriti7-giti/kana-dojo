const japaneseVoices = voices
          .filter(voice => {
            // Only accept actual Japanese voices
            return (
              voice.lang.startsWith('ja') ||
              voice.lang === 'ja-JP' ||
              voice.lang === 'ja' ||
              voice.name.toLowerCase().includes('japanese') ||
              voice.name.toLowerCase().includes('japan')
            );
          })
          .map(voice => ({
            name: voice.name,
            lang: voice.lang,
            voice: voice,
          }))
          .sort((a, b) => {
            // Prioritize actual Japanese voices
            if (a.lang === 'ja-JP' && b.lang !== 'ja-JP') return -1;
            if (b.lang === 'ja-JP' && a.lang !== 'ja-JP') return 1;
            if (a.lang.startsWith('ja') && !b.lang.startsWith('ja')) return -1;
            if (b.lang.startsWith('ja') && !a.lang.startsWith('ja')) return 1;
            return a.name.localeComp