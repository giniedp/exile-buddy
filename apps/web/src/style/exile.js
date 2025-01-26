import plugin from 'tailwindcss/plugin'

export default plugin(({ addComponents }) => {

  addComponents({
    '.exlie-3-slice,.exlie-btn,.exile-item-header,.exile-title-bar': {
      '--bg-img-l': "url('/images/buttongenericnormalleft.webp')",
      '--bg-img-m': "url('/images/buttongenericnormalmiddle.webp')",
      '--bg-img-r': "url('/images/buttongenericnormalright.webp')",

      'background-image': 'var(--bg-img-l), var(--bg-img-r), var(--bg-img-m), var(--bg-img-m)',
      'background-repeat': 'no-repeat, no-repeat, repeat-x, repeat-x',
      'background-size': 'auto 100%, auto 100%, auto 100%, auto 100%',
      'background-position': 'left center, right center, 50% 50%, calc(50% - 1rem) 50%',
    },
    '.exlie-btn.generic': {
      '--bg-img-l': "url('/images/buttongenericnormalleft.webp')",
      '--bg-img-m': "url('/images/buttongenericnormalmiddle.webp')",
      '--bg-img-r': "url('/images/buttongenericnormalright.webp')",
      '&:hover': {
        '--bg-img-l': "url('/images/buttongenerichoverleft.webp')",
        '--bg-img-m': "url('/images/buttongenerichovermiddle.webp')",
        '--bg-img-r': "url('/images/buttongenerichoverright.webp')",
      },
      '&:active': {
        '--bg-img-l': "url('/images/buttongenericpressedleft.webp')",
        '--bg-img-m': "url('/images/buttongenericpressedmiddle.webp')",
        '--bg-img-r': "url('/images/buttongenericpressedright.webp')",
      }
    },
    '.exlie-btn.green': {
      '--bg-img-l': "url('/images/buttongreennormalleft.webp')",
      '--bg-img-m': "url('/images/buttongreennormalmiddle.webp')",
      '--bg-img-r': "url('/images/buttongreennormalright.webp')",
      '&:hover': {
        '--bg-img-l': "url('/images/buttongreenhoverleft.webp')",
        '--bg-img-m': "url('/images/buttongreenhovermiddle.webp')",
        '--bg-img-r': "url('/images/buttongreenhoverright.webp')",
      },
      '&:active': {
        '--bg-img-l': "url('/images/buttongreenpressedleft.webp')",
        '--bg-img-m': "url('/images/buttongreenpressedmiddle.webp')",
        '--bg-img-r': "url('/images/buttongreenpressedright.webp')",
      }
    },
    '.exlie-btn.orange': {
      '--bg-img-l': "url('/images/buttonorangenormalleft.webp')",
      '--bg-img-m': "url('/images/buttonorangenormalmiddle.webp')",
      '--bg-img-r': "url('/images/buttonorangenormalright.webp')",
      '&:hover': {
        '--bg-img-l': "url('/images/buttonorangehoverleft.webp')",
        '--bg-img-m': "url('/images/buttonorangehovermiddle.webp')",
        '--bg-img-r': "url('/images/buttonorangehoverright.webp')",
      },
      '&:active': {
        '--bg-img-l': "url('/images/buttonorangepressedleft.webp')",
        '--bg-img-m': "url('/images/buttonorangepressedmiddle.webp')",
        '--bg-img-r': "url('/images/buttonorangepressedright.webp')",
      }
    },
    '.exlie-btn.red': {
      '--bg-img-l': "url('/images/buttonrednormalleft.webp')",
      '--bg-img-m': "url('/images/buttonrednormalmiddle.webp')",
      '--bg-img-r': "url('/images/buttonrednormalright.webp')",
      '&:hover': {
        '--bg-img-l': "url('/images/buttonredhoverleft.webp')",
        '--bg-img-m': "url('/images/buttonredhovermiddle.webp')",
        '--bg-img-r': "url('/images/buttonredhoverright.webp')",
      },
      '&:active': {
        '--bg-img-l': "url('/images/buttonredpressedleft.webp')",
        '--bg-img-m': "url('/images/buttonredpressedmiddle.webp')",
        '--bg-img-r': "url('/images/buttonredpressedright.webp')",
      }
    }
  })


  addComponents({
    '.exlie-icon-btn': {
      '--bg-img': "url('/images/fouriconbuttonnormal.webp')",

      'background-image': 'var(--bg-img)',
      'background-repeat': 'no-repeat',
      'background-size': '100% 100%, auto 100%, auto 100%, auto 100%',
      'aspect-ratio': '1 / 1',

      '&:hover': {
        '--bg-img': "url('/images/fouriconbuttonhover.webp')",
      },
      '&:active': {
        '--bg-img': "url('/images/fouriconbuttonpressed.webp')",
      }
    },
    '.exlie-icon-btn.orange': {
      '--bg-img': "url('/images/fouriconbuttonorangenormal.webp')",
      '&:hover': {
        '--bg-img': "url('/images/fouriconbuttonorangehover.webp')",
      },
      '&:active': {
        '--bg-img': "url('/images/fouriconbuttonorangepressed.webp')",
      }
    },
    '.exlie-icon-btn.close': {
      '--bg-img': "url('/images/buttonclosenormal.webp')",
      '&:hover': {
        '--bg-img': "url('/images/buttonclosehover.webp')",
      },
      '&:active': {
        '--bg-img': "url('/images/buttonclosedown.webp')",
      }
    }
  })

  addComponents({
    '.exile-item-header': {
      '--bg-img-l': "url('/images/itemsheaderwhiteleft.webp')",
      '--bg-img-m': "url('/images/itemsheaderwhitemiddle.webp')",
      '--bg-img-r': "url('/images/itemsheaderwhiteright.webp')",
      '&.double': {
        '--bg-img-l': "url('/images/itemsheaderdoublenormalleft.webp')",
        '--bg-img-m': "url('/images/itemsheaderdoublenormalmiddle.webp')",
        '--bg-img-r': "url('/images/itemsheaderdoublenormalright.webp')",
      },

      '&.white,&.normal': {
        '--bg-img-l': "url('/images/itemsheaderwhiteleft.webp')",
        '--bg-img-m': "url('/images/itemsheaderwhitemiddle.webp')",
        '--bg-img-r': "url('/images/itemsheaderwhiteright.webp')",
        '&.double': {
          '--bg-img-l': "url('/images/itemsheaderdoublenormalleft.webp')",
          '--bg-img-m': "url('/images/itemsheaderdoublenormalmiddle.webp')",
          '--bg-img-r': "url('/images/itemsheaderdoublenormalright.webp')",
        },
      },

      '&.magic': {
        '--bg-img-l': "url('/images/itemsheadermagicleft.webp')",
        '--bg-img-m': "url('/images/itemsheadermagicmiddle.webp')",
        '--bg-img-r': "url('/images/itemsheadermagicright.webp')",
        '&.double': {
          '--bg-img-l': "url('/images/itemsheaderdoublemagicleft.webp')",
          '--bg-img-m': "url('/images/itemsheaderdoublemagicmiddle.webp')",
          '--bg-img-r': "url('/images/itemsheaderdoublemagicright.webp')",
        },
      },

      '&.rare': {
        '--bg-img-l': "url('/images/itemsheaderraresinglelineleft.webp')",
        '--bg-img-m': "url('/images/itemsheaderraresinglelinemiddle.webp')",
        '--bg-img-r': "url('/images/itemsheaderraresinglelineright.webp')",
        '&.double': {
          '--bg-img-l': "url('/images/itemsheaderrareleft.webp')",
          '--bg-img-m': "url('/images/itemsheaderraremiddle.webp')",
          '--bg-img-r': "url('/images/itemsheaderrareright.webp')",
        },
      },

      '&.unique': {
        '--bg-img-l': "url('/images/itemsheaderuniquesinglelineleft.webp')",
        '--bg-img-m': "url('/images/itemsheaderuniquesinglelinemiddle.webp')",
        '--bg-img-r': "url('/images/itemsheaderuniquesinglelineright.webp')",
        '&.double': {
          '--bg-img-l': "url('/images/itemsheaderuniqueleft.webp')",
          '--bg-img-m': "url('/images/itemsheaderuniquemiddle.webp')",
          '--bg-img-r': "url('/images/itemsheaderuniqueright.webp')",
        },
      },

      '&.currency': {
        '--bg-img-l': "url('/images/itemsheaderdoublecurrencyleft.webp')",
        '--bg-img-m': "url('/images/itemsheaderdoublecurrencymiddle.webp')",
        '--bg-img-r': "url('/images/itemsheaderdoublecurrencyright.webp')",
        '&.double': {
          '--bg-img-l': "url('/images/itemsheaderdoublecurrencyleft.webp')",
          '--bg-img-m': "url('/images/itemsheaderdoublecurrencymiddle.webp')",
          '--bg-img-r': "url('/images/itemsheaderdoublecurrencyright.webp')",
        },
      },

      '&.gem': {
        '--bg-img-l': "url('/images/itemsheadergemleft.webp')",
        '--bg-img-m': "url('/images/itemsheadergemmiddle.webp')",
        '--bg-img-r': "url('/images/itemsheadergemright.webp')",
        '&.double': {
          '--bg-img-l': "url('/images/itemsheaderdoublegemleft.webp')",
          '--bg-img-m': "url('/images/itemsheaderdoublegemmiddle.webp')",
          '--bg-img-r': "url('/images/itemsheaderdoublegemright.webp')",
        },
      },

      '&.quest': {
        '--bg-img-l': "url('/images/itemsheaderquestleft.webp')",
        '--bg-img-m': "url('/images/itemsheaderquestmiddle.webp')",
        '--bg-img-r': "url('/images/itemsheaderquestright.webp')",
        '&.double': {
          '--bg-img-l': "url('/images/itemsheaderdoublequestleft.webp')",
          '--bg-img-m': "url('/images/itemsheaderdoublequestmiddle.webp')",
          '--bg-img-r': "url('/images/itemsheaderdoublequestright.webp')",
        },
      },
    },
  })

  addComponents({
    '.exile-item-separator': {
      '--bg-img-separator': "url('/images/itemsseparatorwhite.webp')",
      height: '1rem',
      backgroundImage: 'var(--bg-img-separator)',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',

      '&.white,&.normal': {
        '--bg-img-separator': "url('/images/itemsseparatorwhite.webp')",
      },

      '&.magic': {
        '--bg-img-separator': "url('/images/itemsseparatormagic.webp')",
      },

      '&.rare': {
        '--bg-img-separator': "url('/images/itemsseparatorrare.webp')",
      },

      '&.unique': {
        '--bg-img-separator': "url('/images/itemsseparatorunique.webp')",
      },

      '&.currency': {
        '--bg-img-separator': "url('/images/itemsseparatorcurrency.webp')",
      },

      '&.gem': {
        '--bg-img-separator': "url('/images/itemsseparatorgem.webp')",
      },

      '&.quest': {
        '--bg-img-separator': "url('/images/itemsseparatorquest.webp')",
      },
    },
  })

  addComponents({
    '.exile-text-tag': {
      borderBottom: '2px dotted currentColor',
    },
  })

  addComponents({
    '.exile-title-bar': {
      '--bg-img-l': "url('/images/windowtitlebarleft.webp')",
      '--bg-img-m': "url('/images/windowtitlebarmiddle.webp')",
      '--bg-img-r': "url('/images/windowtitlebarright.webp')",
    },
    '.exile-title-bar.account': {
      '--bg-img-l': "url('/images/accounttitlebarleft.webp')",
      '--bg-img-m': "url('/images/accounttitlebarmiddle.webp')",
      '--bg-img-r': "url('/images/accounttitlebarright.webp')",
      'background-repeat': 'no-repeat, no-repeat, no-repeat, no-repeat',
      'background-size': 'auto 100%, auto 100%, calc(100% - 2rem) 100%, calc(100% - 2rem) 100%',
      'background-position': 'left center, right center, 50% 50%, 50% 50%',
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
