import { register } from 'register-service-worker'
import { Notify } from 'quasar'
// import i18n from 'boot/i18n'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready () {
    // let isInstalling = false
    // window.addEventListener('beforeinstallprompt', (e) => {
    //   e.preventDefault()
    //   window.deferredPrompt = e
    //   if (!isInstalling) {
    //     Notify.create({
    //       message: 'Would you like to install this App?', // i18n.t('messages.update_available'),
    //       actions: [
    //         { label: 'No', icon: 'cancel', color: 'black', handler: () => { } },
    //         { label: 'Yes', icon: 'check', color: 'black', handler: () => { window.deferredPrompt.prompt() } }
    //       ],
    //       textColor: 'black',
    //       color: 'amber',
    //       position: 'right',
    //       timeout: 30000,
    //       progress: true
    //     })
    //   }
    //   window.deferredPrompt.userChoice.then((choiceResult) => {
    //     if (choiceResult.outcome === 'accepted') {
    //       console.log('User accepted the install prompt')
    //     } else {
    //       console.log('User dismissed the install prompt')
    //     }
    //     isInstalling = true
    //   })
    // })
    window.addEventListener('appinstalled', (evt) => {
      console.log('App installed')
    })
    console.log('App is being served from cache by a service worker.')
    if (process.env.DEV) {
      console.log('App is being served from cache by a service worker.')
    }
  },

  registered (/* registration */) {
    if (process.env.DEV) {
      console.log('Service worker has been registered.')
    }
  },

  cached (/* registration */) {
    console.log('Content has been cached for offline use.')
    if (process.env.DEV) {
      console.log('Content has been cached for offline use.')
    }
  },

  updatefound (/* registration */) {
    console.log('New content is downloading.')
    if (process.env.DEV) {
      console.log('New content is downloading.')
    }
  },

  updated (registration) {
    // console.log(registration)
    console.log('New content is available; please refresh.')
    Notify.create({
      message: 'A new version is avaliable, please refresh.', // i18n.t('messages.update_available'),
      actions: [
        { label: 'Refresh', icon: 'cloud_download', color: 'black', handler: () => { } }
      ],
      textColor: 'black',
      color: 'amber',
      position: 'top',
      timeout: 30000,
      progress: true,
      onDismiss () {
        window.location.reload(true)
      }
    })
    if (process.env.DEV) {
      console.log('New content is available; please refresh dev.')
    }
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
    if (process.env.DEV) {
      console.log('No internet connection found. App is running in offline mode.')
    }
  }

  // error (err) {
  //   if (process.env.DEV) {
  //     console.error('Error during service worker registration:', err)
  //   }
  // }
})
