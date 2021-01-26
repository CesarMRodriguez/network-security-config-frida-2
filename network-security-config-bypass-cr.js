//frida -U -l network-security-config-bypass-cr.js --no-pause -f com.example.bypassnsc2 
Java.perform(function(){
      var ANDROID_VERSION_M = 23;

      var DefaultConfigSource = Java.use("android.security.net.config.ManifestConfigSource$DefaultConfigSource");
      var NetworkSecurityConfig = Java.use("android.security.net.config.NetworkSecurityConfig");
      var ManifestConfigSource = Java.use("android.security.net.config.ManifestConfigSource");

      var NetworkSecurityTrustManager = Java.use("android.security.net.config.NetworkSecurityTrustManager");

      ManifestConfigSource.getConfigSource.implementation = function () {
            
            var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
            console.log("\nBacktrace:\n" + bt);
        
            console.log("[+] Modifying ManifestConfigSource getConfigSource");
            //if the API is <= 25 the DefaultConfigSource has 2 methods, if not it has 3.
            if (DefaultConfigSource.$new.argumentTypes.length == 2) {
              //if API >= 28 second parameter is ApplicationInfo
              if (DefaultConfigSource.$new.argumentTypes[1].className == "android.content.pm.ApplicationInfo") {
                var ApplicationInfo = Java.use("android.content.pm.ApplicationInfo");
                var appInstance = ApplicationInfo.$new();
                appInstance.targetSdkVersion.value = ANDROID_VERSION_M;
                appInstance.targetSandboxVersion.value = 1;
                return DefaultConfigSource.$new(true,appInstance);
              } else {
                return DefaultConfigSource.$new(true,ANDROID_VERSION_M);        
              } 
            } else {
              return DefaultConfigSource.$new(true,ANDROID_VERSION_M,ANDROID_VERSION_M);
            }
            
      }

      var RootTrustManager = Java.use("android.security.net.config.RootTrustManager");

      RootTrustManager.$init.implementation = function (applicationconfig) {
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("\nBacktrace:\n" + bt);
        return this.$init(applicationconfig);    
      } 

      NetworkSecurityTrustManager.$init.implementation = function (networksecconfig) {
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("\nBacktrace:\n" + bt);
        return this.$init(networksecconfig);    
      }

});

/*
Java.perform(function(){
      var DefaultConfigSource = Java.use("android.security.net.config.ManifestConfigSource$DefaultConfigSource");
      console.log(JSON.stringify(DefaultConfigSource.$new.argumentTypes[1].className == "android.content.pm.ApplicationInfo"));

      var ApplicationInfo = Java.use("android.content.pm.ApplicationInfo");
      var appInstance = ApplicationInfo.$new();
      console.log(appInstance.targetSdkVersion.value);// = ANDROID_VERSION_M;
      console.log(appInstance.targetSandboxVersion.value);// = 1;
                
 });
 */