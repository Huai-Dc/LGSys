package com.yinhootech.YinheMobileApp.xh;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.rnfs.RNFSPackage;
import com.fileopener.FileOpenerPackage;

import com.liuchungui.react_native_umeng_push.UmengPushApplication;
import com.liuchungui.react_native_umeng_push.UmengPushPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends UmengPushApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFSPackage(),
          new FileOpenerPackage(),
          new UmengPushPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
