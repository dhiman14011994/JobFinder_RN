import { View, Modal, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { client_id, client_secret, mxHeight, redirect_uri } from '../../Util';
import { WebView } from 'react-native-webview';
import { backIcon } from '../../Resources/assets';
import { BackButton } from './VerificationStyle';

const LinkedInWebView = ({ showLinkedIn, onClose, onSuccess }) => {
  const webViewRef = useRef(null);
  const [userLog, setUserLog] = useState('');
  useEffect(() => {
    if (webViewRef.current) {
      console.log('here');
      webViewRef.current.reload();
    }
  }, []);

  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={showLinkedIn}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}
    >
      {/*All views of Modal*/}

      <View
        style={{
          height: mxHeight * 0.85,
          width: '100%',
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => onClose()}
            style={{ height: 44, paddingHorizontal: 22, marginTop: '5%' }}
          >
            <BackButton resizeMode="contain" source={backIcon} />
          </TouchableOpacity>
        </View>
        <WebView
          ref={webViewRef}
          keyboardDisplayRequiresUserAction={true}
          onNavigationStateChange={(navState) => {
            if (navState && navState.url) {
              var url = navState.url;
              if (url.includes('code')) {
                var array = url?.split('code=');
                var code = array ? array[1]?.split('&state=') : [];
                if (code?.length > 0) {
                  setUserLog(code[0]);
                  onSuccess(code[0]);
                  onClose();
                } else {
                  setUserLog('');
                }
              } else {
                setUserLog('');
              }
            } else {
              setUserLog('');
            }
          }}
          source={{
            uri:
              userLog == ''
                ? 'https://www.linkedin.com/uas/oauth2/authorization?client_id=86oqhtj40bpw96&redirect_uri=https://www.linkedin.com/developers/tools/oauth/redirect&response_type=code&scope=r_liteprofile+r_emailaddress&state=bxHb0Bfn27HCzm6A'
                : 'https://www.linkedin.com/m/logout',
          }}
        />
      </View>
    </Modal>
  );
};

export default LinkedInWebView;
