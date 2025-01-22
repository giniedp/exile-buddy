import plugin from 'tailwindcss/plugin'

export default plugin(({ addComponents }) => {
  addComponents({
    '.exile-item-header': {
      '--ih-h': '2rem',
      '--ih-w': '1.5rem',
      '--ih-bg-l': "url('/images/itemsheaderwhiteleft.webp')",
      '--ih-bg-m': "url('/images/itemsheaderwhitemiddle.webp')",
      '--ih-bg-r': "url('/images/itemsheaderwhiteright.webp')",

      'background-image': 'var(--ih-bg-l), var(--ih-bg-r), var(--ih-bg-m), var(--ih-bg-m) ',
      'background-repeat': 'no-repeat, no-repeat, repeat-x , repeat-x',
      'background-size': 'auto 100%, auto 100%, auto 100%, auto 100%',
      'background-position': 'left center, right center, 50% 50%, calc(50% - var(--ih-w) / 2) 50%',
      'min-height': 'var(--ih-h)',

      '&.double': {
        '--ih-h': '3rem',
        '--ih-w': '2.5rem',
      },

      '&.white,&.normal': {
        '--ih-bg-l': "url('/images/itemsheaderwhiteleft.webp')",
        '--ih-bg-m': "url('/images/itemsheaderwhitemiddle.webp')",
        '--ih-bg-r': "url('/images/itemsheaderwhiteright.webp')",
        '&.double': {
          '--ih-bg-l': "url('/images/itemsheaderdoublenormalleft.webp')",
          '--ih-bg-m': "url('/images/itemsheaderdoublenormalmiddle.webp')",
          '--ih-bg-r': "url('/images/itemsheaderdoublenormalright.webp')",
        },
      },

      '&.magic': {
        '--ih-bg-l': "url('/images/itemsheadermagicleft.webp')",
        '--ih-bg-m': "url('/images/itemsheadermagicmiddle.webp')",
        '--ih-bg-r': "url('/images/itemsheadermagicright.webp')",
        '&.double': {
          '--ih-bg-l': "url('/images/itemsheaderdoublemagicleft.webp')",
          '--ih-bg-m': "url('/images/itemsheaderdoublemagicmiddle.webp')",
          '--ih-bg-r': "url('/images/itemsheaderdoublemagicright.webp')",
        },
      },

      '&.rare': {
        '--ih-bg-l': "url('/images/itemsheaderraresinglelineleft.webp')",
        '--ih-bg-m': "url('/images/itemsheaderraresinglelinemiddle.webp')",
        '--ih-bg-r': "url('/images/itemsheaderraresinglelineright.webp')",
        '&.double': {
          '--ih-bg-l': "url('/images/itemsheaderrareleft.webp')",
          '--ih-bg-m': "url('/images/itemsheaderraremiddle.webp')",
          '--ih-bg-r': "url('/images/itemsheaderrareright.webp')",
        },
      },

      '&.unique': {
        '--ih-bg-l': "url('/images/itemsheaderuniquesinglelineleft.webp')",
        '--ih-bg-m': "url('/images/itemsheaderuniquesinglelinemiddle.webp')",
        '--ih-bg-r': "url('/images/itemsheaderuniquesinglelineright.webp')",
        '&.double': {
          '--ih-bg-l': "url('/images/itemsheaderuniqueleft.webp')",
          '--ih-bg-m': "url('/images/itemsheaderuniquemiddle.webp')",
          '--ih-bg-r': "url('/images/itemsheaderuniqueright.webp')",
        },
      },

      '&.currency': {
        '--ih-bg-l': "url('/images/itemsheaderdoublecurrencyleft.webp')",
        '--ih-bg-m': "url('/images/itemsheaderdoublecurrencymiddle.webp')",
        '--ih-bg-r': "url('/images/itemsheaderdoublecurrencyright.webp')",
        '&.double': {
          '--ih-bg-l': "url('/images/itemsheaderdoublecurrencyleft.webp')",
          '--ih-bg-m': "url('/images/itemsheaderdoublecurrencymiddle.webp')",
          '--ih-bg-r': "url('/images/itemsheaderdoublecurrencyright.webp')",
        },
      },

      '&.gem': {
        '--ih-bg-l': "url('/images/itemsheadergemleft.webp')",
        '--ih-bg-m': "url('/images/itemsheadergemmiddle.webp')",
        '--ih-bg-r': "url('/images/itemsheadergemright.webp')",
        '&.double': {
          '--ih-bg-l': "url('/images/itemsheaderdoublegemleft.webp')",
          '--ih-bg-m': "url('/images/itemsheaderdoublegemmiddle.webp')",
          '--ih-bg-r': "url('/images/itemsheaderdoublegemright.webp')",
        },
      },

      '&.quest': {
        '--ih-bg-l': "url('/images/itemsheaderquestleft.webp')",
        '--ih-bg-m': "url('/images/itemsheaderquestmiddle.webp')",
        '--ih-bg-r': "url('/images/itemsheaderquestright.webp')",
        '&.double': {
          '--ih-bg-l': "url('/images/itemsheaderdoublequestleft.webp')",
          '--ih-bg-m': "url('/images/itemsheaderdoublequestmiddle.webp')",
          '--ih-bg-r': "url('/images/itemsheaderdoublequestright.webp')",
        },
      },
    },
  })

  addComponents({
    '.nine-slice-pane': {
      '--bg-image': "url('/images/skillpanelframe2.webp')",
      '--bg-size': '500px', // image size in pixels. Don't use %
      '--bg-inset': '10%',  // cut inset, can be in % or px
      '--bg-fade': '10%',   // fade span (after inset) can be in % or px
      '--bg-in-t': 'var(--bg-inset)',
      '--bg-in-r': 'var(--bg-inset)',
      '--bg-in-b': 'var(--bg-inset)',
      '--bg-in-l': 'var(--bg-inset)',

      position: 'relative',
      overflow: 'clip',

      '.corners-t, .corners-b, .sides, .edge-t, .edge-b': {
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundImage: 'var(--bg-image)',
          backgroundSize: 'var(--bg-size) auto',
          zIndex: '0',
          userSelect: 'none',
          select: 'none',
          pointerEvents: 'none',
        },
      },
      '.edge-t, .edge-b, .sides': {
        zIndex: '1',
        '&::before': {
          zIndex: '1',
        },
        '&::after': {
          zIndex: '1',
        },
      },
      '.corners-t, .corners-b': {
        zIndex: '2',
        '&::before': {
          zIndex: '2',
        },
        '&::after': {
          zIndex: '2',
        },
      },
      '.corners-t::before': {
        backgroundPosition: 'top left',
        maskImage: 'radial-gradient(circle at top left, black var(--bg-in-t), transparent calc(var(--bg-in-t) + var(--bg-fade)))',
      },
      '.corners-t::after': {
        backgroundPosition: 'top right',
        maskImage: 'radial-gradient(circle at top right, black var(--bg-in-t), transparent calc(var(--bg-in-t) + var(--bg-fade)))',
      },
      '.corners-b::before': {
        backgroundPosition: 'bottom left',
        maskImage: 'radial-gradient(circle at bottom left, black var(--bg-in-b), transparent calc(var(--bg-in-b) + var(--bg-fade)))',
      },
      '.corners-b::after': {
        backgroundPosition: 'bottom right',
        maskImage: 'radial-gradient(circle at bottom right, black var(--bg-in-b), transparent calc(var(--bg-in-b) + var(--bg-fade)))',
      },

      '.edge-t::before, .edge-t::after': {
        backgroundPosition: 'calc(50% - var(--bg-fade)) top',
        maskPosition: 'calc(50% - var(--bg-fade)) top',
        maskComposite: 'subtract',
        maskImage: `
          linear-gradient(to right, transparent var(--bg-in-l), black calc(var(--bg-in-l) + var(--bg-fade)), black calc(100% - var(--bg-in-r) - var(--bg-fade)), transparent calc(100% - var(--bg-in-r)) ),
          linear-gradient(to bottom, transparent var(--bg-in-t), black calc(var(--bg-in-t) + var(--bg-fade)))
        `,
        maskSize: 'var(--bg-size) 100%',
        maskRepeat: 'repeat',

      },
      '.edge-t::after': {
        backgroundPosition: 'calc(50% + var(--bg-fade)) top',
        maskPosition: 'calc(50% + var(--bg-fade)) top',
      },

      '.edge-b::before, .edge-b::after': {
        backgroundPosition: 'calc(50% - var(--bg-fade)) bottom',
        maskPosition: 'calc(50% - var(--bg-fade)) bottom',
        maskComposite: 'subtract',
        maskImage: `
          linear-gradient(to right, transparent var(--bg-in-l), black calc(var(--bg-in-l) + var(--bg-fade)), black calc(100% - var(--bg-in-r) - var(--bg-fade)), transparent calc(100% - var(--bg-in-r)) ),
          linear-gradient(to top, transparent var(--bg-in-b), black calc(var(--bg-in-b) + var(--bg-fade)))
        `,
        maskSize: 'var(--bg-size) 100%',
        maskRepeat: 'repeat',

      },
      '.edge-b::after': {
        backgroundPosition: 'calc(50% + var(--bg-fade)) bottom',
        maskPosition: 'calc(50% + var(--bg-fade)) bottom',
      },

      '.sides::before': {
        backgroundPosition: 'left top',
        maskPosition: 'left top',
        right: 'initial',
        width: 'var(--bg-in-l)',
        backgroundSize: 'var(--bg-size) 100%',
        maskImage: `
          linear-gradient(to bottom, transparent var(--bg-in-t), black calc(var(--bg-in-t) + var(--bg-fade)), black calc(100% - var(--bg-in-b) - var(--bg-fade)), transparent calc(100% - var(--bg-in-b)) )
        `,
        maskSize: '100% 100%',
      },
      '.sides::after': {
        backgroundPosition: 'right top',
        maskPosition: 'right top',
        left: 'initial',
        width: 'var(--bg-in-l)',
        backgroundSize: 'var(--bg-size) 100%',
        maskImage: `
          linear-gradient(to bottom, transparent var(--bg-in-t), black calc(var(--bg-in-t) + var(--bg-fade)), black calc(100% - var(--bg-in-b) - var(--bg-fade)), transparent calc(100% - var(--bg-in-b)) )
        `,
        maskSize: '100% 100%',
      },

    },
  })

})
