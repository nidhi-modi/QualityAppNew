import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
  BackHandler,
  Image,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Dropdown from 'react-dropdown';
import RadioGroup from 'react-native-radio-buttons-group';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import Realm from 'realm';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import RNRestart from 'react-native-restart';

let realm;
var currentWeekNumber = require('current-week-number');
var count = 0;

class RadioButton extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onClick}
        activeOpacity={0.8}
        style={styles.radioButton}>
        <View
          style={[
            styles.radioButtonHolder,
            {
              height: this.props.button.size,
              width: this.props.button.size,
              borderColor: this.props.button.color,
            },
          ]}>
          {this.props.button.selected ? (
            <View
              style={[
                styles.radioIcon,
                {
                  height: this.props.button.size / 2,
                  width: this.props.button.size / 2,
                  backgroundColor: this.props.button.color,
                },
              ]}></View>
          ) : null}
        </View>
        <Text style={[styles.label, {color: this.props.button.color}]}>
          {this.props.button.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default class OhaQualityActivity extends React.Component {
  constructor(props) {
    super(props);

    this.calculateQualityPercentage = this.calculateQualityPercentage.bind(
      this,
    );

    this.state = {
      isLoading: false,

      radioClippingItems1: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioClippingItems2: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioClippingItems3: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioClippingItems4: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDroppingItems1: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDroppingItems2: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDroppingItems3: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDroppingItems4: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioPruningItems1: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioPruningItems2: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioPruningItems3: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioPruningItems4: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioTwistingItems1: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioTwistingItems2: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioTwistingItems3: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioTwistingItems4: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDeleafingItems1: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDeleafingItems2: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDeleafingItems3: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDeleafingItems4: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioPickingItems1: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioPickingItems2: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioPickingItems3: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioPickingItems4: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioTrussCuttingItems1: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioTrussCuttingItems2: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioTrussCuttingItems3: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioTrussCuttingItems4: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDensityItems1: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDensityItems2: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDensityItems3: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      radioDensityItems4: [
        {
          label: 'Pass',
          size: 35,
          color: 'green',
          selected: false,
        },

        {
          label: 'Fail',
          size: 35,
          color: 'red',
          selected: false,
        },
      ],

      clippingOption1: '',
      clippingOption2: '',
      clippingOption3: '',
      clippingOption4: '',

      droppingOption1: '',
      droppingOption2: '',
      droppingOption3: '',
      droppingOption4: '',

      pruningOption1: '',
      pruningOption2: '',
      pruningOption3: '',
      pruningOption4: '',

      twistingOption1: '',
      twistingOption2: '',
      twistingOption3: '',
      twistingOption4: '',

      deleafingOption1: '',
      deleafingOption2: '',
      deleafingOption3: '',
      deleafingOption4: '',

      pickingOption1: '',
      pickingOption2: '',
      pickingOption3: '',
      pickingOption4: '',

      trussCuttingOption1: '',
      trussCuttingOption2: '',
      trussCuttingOption3: '',
      trussCuttingOption4: '',

      densityOption1: '',
      densityOption2: '',
      densityOption3: '',
      densityOption4: '',

      auditorsName: '',
      houseNumber: '',
      rowNumber: '',
      weekNumber: '',
      comments: '',

      isItConnected: '',
      isDataSend: false,
      qualityPercentage: 0,
      lastRefresh: Date(Date.now()).toString(),
    };

    realm = new Realm({path: 'QualitySheetDatabase1.realm'});
  }

  //CHECKING CONNECTION

  handleConnectivityChange = (state) => {
    if (state.isConnected) {
      this.setState({isItConnected: 'Online'});
    } else {
      this.setState({isItConnected: 'Offline'});
    }
  };

  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.isConnected.fetch().then((isConnected) => {
        if (isConnected) {
          Alert.alert('You are online!');
        } else {
          Alert.alert('You are offline!');
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleFirstConnectivityChange,
      );
    }
  };

  handleFirstConnectivityChange = (isConnected) => {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );

    if (isConnected === false) {
      Alert.alert('You are offline!');
    } else {
      Alert.alert('You are online!');
    }
  };

  //END

  handleBackButton = () => {
    BackHandler.exitApp();
  };

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    var numberWeek = 2100 + currentWeekNumber(new Date()) - 1;
    console.log('Current Week Number: ', numberWeek);
    this.setState({weekNumber: numberWeek});

    NetInfo.addEventListener(this.handleConnectivityChange);

    /*const siteName = this.props.route.params.site1;
        AsyncStorage.setItem('house', JSON.stringify(siteName));

        console.log("Data Saved successfully : " + JSON.stringify(siteName));*/
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  //CLIPPING

  changeActiveRadioClippingButton1(index) {
    this.state.radioClippingItems1.map((item) => {
      item.selected = false;
    });

    this.state.radioClippingItems1[index].selected = true;

    this.setState({radioClippingItems1: this.state.radioClippingItems1}, () => {
      this.setState({
        clippingOption1: this.state.radioClippingItems1[index].label,
      });
    });
  }

  changeActiveRadioClippingButton2(index) {
    this.state.radioClippingItems2.map((item) => {
      item.selected = false;
    });

    this.state.radioClippingItems2[index].selected = true;

    this.setState({radioClippingItems2: this.state.radioClippingItems2}, () => {
      this.setState({
        clippingOption2: this.state.radioClippingItems2[index].label,
      });
    });
  }

  changeActiveRadioClippingButton3(index) {
    this.state.radioClippingItems3.map((item) => {
      item.selected = false;
    });

    this.state.radioClippingItems3[index].selected = true;

    this.setState({radioClippingItems3: this.state.radioClippingItems3}, () => {
      this.setState({
        clippingOption3: this.state.radioClippingItems3[index].label,
      });
    });
  }

  changeActiveRadioClippingButton4(index) {
    this.state.radioClippingItems4.map((item) => {
      item.selected = false;
    });

    this.state.radioClippingItems4[index].selected = true;

    this.setState({radioClippingItems4: this.state.radioClippingItems4}, () => {
      this.setState({
        clippingOption4: this.state.radioClippingItems4[index].label,
      });
    });
  }

  //TRUSS CUTTING

  changeActiveRadioTrussCuttingButton1(index) {
    this.state.radioTrussCuttingItems1.map((item) => {
      item.selected = false;
    });

    this.state.radioTrussCuttingItems1[index].selected = true;

    this.setState(
      {radioTrussCuttingItems1: this.state.radioTrussCuttingItems1},
      () => {
        this.setState({
          trussCuttingOption1: this.state.radioTrussCuttingItems1[index].label,
        });
      },
    );
  }

  changeActiveRadioTrussCuttingButton2(index) {
    this.state.radioTrussCuttingItems2.map((item) => {
      item.selected = false;
    });

    this.state.radioTrussCuttingItems2[index].selected = true;

    this.setState(
      {radioTrussCuttingItems2: this.state.radioTrussCuttingItems2},
      () => {
        this.setState({
          trussCuttingOption2: this.state.radioTrussCuttingItems2[index].label,
        });
      },
    );
  }

  changeActiveRadioTrussCuttingButton3(index) {
    this.state.radioTrussCuttingItems3.map((item) => {
      item.selected = false;
    });

    this.state.radioTrussCuttingItems3[index].selected = true;

    this.setState(
      {radioTrussCuttingItems3: this.state.radioTrussCuttingItems3},
      () => {
        this.setState({
          trussCuttingOption3: this.state.radioTrussCuttingItems3[index].label,
        });
      },
    );
  }

  changeActiveRadioTrussCuttingButton4(index) {
    this.state.radioTrussCuttingItems4.map((item) => {
      item.selected = false;
    });

    this.state.radioTrussCuttingItems4[index].selected = true;

    this.setState(
      {radioTrussCuttingItems4: this.state.radioTrussCuttingItems4},
      () => {
        this.setState({
          trussCuttingOption4: this.state.radioTrussCuttingItems4[index].label,
        });
      },
    );
  }

  //DENSITY

  changeActiveRadioDensityButton1(index) {
    this.state.radioDensityItems1.map((item) => {
      item.selected = false;
    });

    this.state.radioDensityItems1[index].selected = true;

    this.setState({radioDensityItems1: this.state.radioDensityItems1}, () => {
      this.setState({
        densityOption1: this.state.radioDensityItems1[index].label,
      });
    });
  }

  changeActiveRadioDensityButton2(index) {
    this.state.radioDensityItems2.map((item) => {
      item.selected = false;
    });

    this.state.radioDensityItems2[index].selected = true;

    this.setState({radioDensityItems2: this.state.radioDensityItems2}, () => {
      this.setState({
        densityOption2: this.state.radioDensityItems2[index].label,
      });
    });
  }

  changeActiveRadioDensityButton3(index) {
    this.state.radioDensityItems3.map((item) => {
      item.selected = false;
    });

    this.state.radioDensityItems3[index].selected = true;

    this.setState({radioDensityItems3: this.state.radioDensityItems3}, () => {
      this.setState({
        densityOption3: this.state.radioDensityItems3[index].label,
      });
    });
  }

  changeActiveRadioDensityButton4(index) {
    this.state.radioDensityItems4.map((item) => {
      item.selected = false;
    });

    this.state.radioDensityItems4[index].selected = true;

    this.setState({radioDensityItems4: this.state.radioDensityItems4}, () => {
      this.setState({
        densityOption4: this.state.radioDensityItems4[index].label,
      });
    });
  }

  //DROPPING

  changeActiveRadioDroppingButton1(index) {
    this.state.radioDroppingItems1.map((item) => {
      item.selected = false;
    });

    this.state.radioDroppingItems1[index].selected = true;

    this.setState({radioDroppingItems1: this.state.radioDroppingItems1}, () => {
      this.setState({
        droppingOption1: this.state.radioDroppingItems1[index].label,
      });
    });
  }

  changeActiveRadioDroppingButton2(index) {
    this.state.radioDroppingItems2.map((item) => {
      item.selected = false;
    });

    this.state.radioDroppingItems2[index].selected = true;

    this.setState({radioDroppingItems2: this.state.radioDroppingItems2}, () => {
      this.setState({
        droppingOption2: this.state.radioDroppingItems2[index].label,
      });
    });
  }

  changeActiveRadioDroppingButton3(index) {
    this.state.radioDroppingItems3.map((item) => {
      item.selected = false;
    });

    this.state.radioDroppingItems3[index].selected = true;

    this.setState({radioDroppingItems3: this.state.radioDroppingItems3}, () => {
      this.setState({
        droppingOption3: this.state.radioDroppingItems3[index].label,
      });
    });
  }

  changeActiveRadioDroppingButton4(index) {
    this.state.radioDroppingItems4.map((item) => {
      item.selected = false;
    });

    this.state.radioDroppingItems4[index].selected = true;

    this.setState({radioDroppingItems4: this.state.radioDroppingItems4}, () => {
      this.setState({
        droppingOption4: this.state.radioDroppingItems4[index].label,
      });
    });
  }

  //PRUNING

  changeActiveRadioPruningButton1(index) {
    this.state.radioPruningItems1.map((item) => {
      item.selected = false;
    });

    this.state.radioPruningItems1[index].selected = true;

    this.setState({radioPruningItems1: this.state.radioPruningItems1}, () => {
      this.setState({
        pruningOption1: this.state.radioPruningItems1[index].label,
      });
    });
  }

  changeActiveRadioPruningButton2(index) {
    this.state.radioPruningItems2.map((item) => {
      item.selected = false;
    });

    this.state.radioPruningItems2[index].selected = true;

    this.setState({radioPruningItems2: this.state.radioPruningItems2}, () => {
      this.setState({
        pruningOption2: this.state.radioPruningItems2[index].label,
      });
    });
  }

  changeActiveRadioPruningButton3(index) {
    this.state.radioPruningItems3.map((item) => {
      item.selected = false;
    });

    this.state.radioPruningItems3[index].selected = true;

    this.setState({radioPruningItems3: this.state.radioPruningItems3}, () => {
      this.setState({
        pruningOption3: this.state.radioPruningItems3[index].label,
      });
    });
  }

  changeActiveRadioPruningButton4(index) {
    this.state.radioPruningItems4.map((item) => {
      item.selected = false;
    });

    this.state.radioPruningItems4[index].selected = true;

    this.setState({radioPruningItems4: this.state.radioPruningItems4}, () => {
      this.setState({
        pruningOption4: this.state.radioPruningItems4[index].label,
      });
    });
  }

  //TWISTING

  changeActiveRadioTwistingButton1(index) {
    this.state.radioTwistingItems1.map((item) => {
      item.selected = false;
    });

    this.state.radioTwistingItems1[index].selected = true;

    this.setState({radioTwistingItems1: this.state.radioTwistingItems1}, () => {
      this.setState({
        twistingOption1: this.state.radioTwistingItems1[index].label,
      });
    });
  }

  changeActiveRadioTwistingButton2(index) {
    this.state.radioTwistingItems2.map((item) => {
      item.selected = false;
    });

    this.state.radioTwistingItems2[index].selected = true;

    this.setState({radioTwistingItems2: this.state.radioTwistingItems2}, () => {
      this.setState({
        twistingOption2: this.state.radioTwistingItems2[index].label,
      });
    });
  }

  changeActiveRadioTwistingButton3(index) {
    this.state.radioTwistingItems3.map((item) => {
      item.selected = false;
    });

    this.state.radioTwistingItems3[index].selected = true;

    this.setState({radioTwistingItems3: this.state.radioTwistingItems3}, () => {
      this.setState({
        twistingOption3: this.state.radioTwistingItems3[index].label,
      });
    });
  }

  changeActiveRadioTwistingButton4(index) {
    this.state.radioTwistingItems4.map((item) => {
      item.selected = false;
    });

    this.state.radioTwistingItems4[index].selected = true;

    this.setState({radioTwistingItems4: this.state.radioTwistingItems4}, () => {
      this.setState({
        twistingOption4: this.state.radioTwistingItems4[index].label,
      });
    });
  }

  //DELEAFING

  changeActiveRadioDeleafingButton1(index) {
    this.state.radioDeleafingItems1.map((item) => {
      item.selected = false;
    });

    this.state.radioDeleafingItems1[index].selected = true;

    this.setState(
      {radioDeleafingItems1: this.state.radioDeleafingItems1},
      () => {
        this.setState({
          deleafingOption1: this.state.radioDeleafingItems1[index].label,
        });
      },
    );
  }

  changeActiveRadioDeleafingButton2(index) {
    this.state.radioDeleafingItems2.map((item) => {
      item.selected = false;
    });

    this.state.radioDeleafingItems2[index].selected = true;

    this.setState(
      {radioDeleafingItems2: this.state.radioDeleafingItems2},
      () => {
        this.setState({
          deleafingOption2: this.state.radioDeleafingItems2[index].label,
        });
      },
    );
  }

  changeActiveRadioDeleafingButton3(index) {
    this.state.radioDeleafingItems3.map((item) => {
      item.selected = false;
    });

    this.state.radioDeleafingItems3[index].selected = true;

    this.setState(
      {radioDeleafingItems3: this.state.radioDeleafingItems3},
      () => {
        this.setState({
          deleafingOption3: this.state.radioDeleafingItems3[index].label,
        });
      },
    );
  }

  changeActiveRadioDeleafingButton4(index) {
    this.state.radioDeleafingItems4.map((item) => {
      item.selected = false;
    });

    this.state.radioDeleafingItems4[index].selected = true;

    this.setState(
      {radioDeleafingItems4: this.state.radioDeleafingItems4},
      () => {
        this.setState({
          deleafingOption4: this.state.radioDeleafingItems4[index].label,
        });
      },
    );
  }

  //PICKING

  changeActiveRadioPickingButton1(index) {
    this.state.radioPickingItems1.map((item) => {
      item.selected = false;
    });

    this.state.radioPickingItems1[index].selected = true;

    this.setState({radioPickingItems1: this.state.radioPickingItems1}, () => {
      this.setState({
        pickingOption1: this.state.radioPickingItems1[index].label,
      });
    });
  }

  changeActiveRadioPickingButton2(index) {
    this.state.radioPickingItems2.map((item) => {
      item.selected = false;
    });

    this.state.radioPickingItems2[index].selected = true;

    this.setState({radioPickingItems2: this.state.radioPickingItems2}, () => {
      this.setState({
        pickingOption2: this.state.radioPickingItems2[index].label,
      });
    });
  }

  changeActiveRadioPickingButton3(index) {
    this.state.radioPickingItems3.map((item) => {
      item.selected = false;
    });

    this.state.radioPickingItems3[index].selected = true;

    this.setState({radioPickingItems3: this.state.radioPickingItems3}, () => {
      this.setState({
        pickingOption3: this.state.radioPickingItems3[index].label,
      });
    });
  }

  changeActiveRadioPickingButton4(index) {
    this.state.radioPickingItems4.map((item) => {
      item.selected = false;
    });

    this.state.radioPickingItems4[index].selected = true;

    this.setState({radioPickingItems4: this.state.radioPickingItems4}, () => {
      this.setState({
        pickingOption4: this.state.radioPickingItems4[index].label,
      });
    });
  }

  calculateQualityPercentage = () => {
    setTimeout(() => {
      /*if (this.state.clippingOption1 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.clippingOption2 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.clippingOption3 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.clippingOption4 === 'Pass') {

                count = count + 5;

            } else {


            }

            if (this.state.pruningOption1 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.pruningOption2 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.pruningOption3 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.pruningOption4 === 'Pass') {

                count = count + 5;

            } else {


            }

            if (this.state.droppingOption1 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.droppingOption2 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.droppingOption3 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.droppingOption4 === 'Pass') {

                count = count + 5;

            } else {


            }

            if (this.state.pickingOption1 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.pickingOption2 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.pickingOption3 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.pickingOption4 === 'Pass') {

                count = count + 5;

            } else {


            }

            if (this.state.deleafingOption1 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.deleafingOption2 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.deleafingOption3 === 'Pass') {

                count = count + 5;

            } else {



            }


            if (this.state.deleafingOption4 === 'Pass') {

                count = count + 5;

            } else {


            }


            this.setState({ qualityPercentage: count })

            console.log("COUNT : " + count);

            count = 0;*/
    }, 1000);

    setTimeout(() => {
      this.saveDataToDB();
    }, 1500);
  };
  resetRadioButtons = () => {
    //CLIPPING 1
    this.state.radioClippingItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioClippingItems1: this.state.radioClippingItems1}, () => {
      this.setState({clippingOption1: this.state.radioClippingItems1[0].label});
    });
    //END

    //CLIPPING 2
    this.state.radioClippingItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioClippingItems2: this.state.radioClippingItems2}, () => {
      this.setState({clippingOption2: this.state.radioClippingItems2[0].label});
    });
    //END

    //CLIPPING 3
    this.state.radioClippingItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioClippingItems3: this.state.radioClippingItems3}, () => {
      this.setState({clippingOption3: this.state.radioClippingItems3[0].label});
    });
    //END

    //CLIPPING 4
    this.state.radioClippingItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioClippingItems4: this.state.radioClippingItems4}, () => {
      this.setState({clippingOption4: this.state.radioClippingItems4[0].label});
    });
    //END

    //TRUSS CUTTING 1
    this.state.radioTrussCuttingItems1.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioTrussCuttingItems1: this.state.radioTrussCuttingItems1},
      () => {
        this.setState({
          trussCuttingOption1: this.state.radioTrussCuttingItems1[0].label,
        });
      },
    );
    //END

    //TRUSS CUTTING 2
    this.state.radioTrussCuttingItems2.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioTrussCuttingItems2: this.state.radioTrussCuttingItems2},
      () => {
        this.setState({
          trussCuttingOption2: this.state.radioTrussCuttingItems2[0].label,
        });
      },
    );
    //END

    //TRUSS CUTTING 3
    this.state.radioTrussCuttingItems3.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioTrussCuttingItems3: this.state.radioTrussCuttingItems3},
      () => {
        this.setState({
          trussCuttingOption3: this.state.radioTrussCuttingItems3[0].label,
        });
      },
    );
    //END

    //TRUSS CUTTING 4
    this.state.radioTrussCuttingItems4.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioTrussCuttingItems4: this.state.radioTrussCuttingItems4},
      () => {
        this.setState({
          trussCuttingOption4: this.state.radioTrussCuttingItems4[0].label,
        });
      },
    );
    //END

    //DENSITY 1
    this.state.radioDensityItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioDensityItems1: this.state.radioDensityItems1}, () => {
      this.setState({
        densityOption1: this.state.radioDensityItems1[0].label,
      });
    });
    //END

    //DENSITY 2
    this.state.radioDensityItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioDensityItems2: this.state.radioDensityItems2}, () => {
      this.setState({
        densityOption2: this.state.radioDensityItems2[0].label,
      });
    });
    //END

    //DENSITY 3
    this.state.radioDensityItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioDensityItems3: this.state.radioDensityItems3}, () => {
      this.setState({
        densityOption3: this.state.radioDensityItems3[0].label,
      });
    });
    //END

    //DENSITY 4
    this.state.radioDensityItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioDensityItems4: this.state.radioDensityItems4}, () => {
      this.setState({
        densityOption4: this.state.radioDensityItems4[0].label,
      });
    });
    //END

    //PRUNING 1
    this.state.radioPruningItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioPruningItems1: this.state.radioPruningItems1}, () => {
      this.setState({pruningOption1: this.state.radioPruningItems1[0].label});
    });
    //END

    //PRUNING 2
    this.state.radioPruningItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioPruningItems2: this.state.radioPruningItems2}, () => {
      this.setState({pruningOption2: this.state.radioPruningItems2[0].label});
    });
    //END

    //PRUNING 3
    this.state.radioPruningItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioPruningItems3: this.state.radioPruningItems3}, () => {
      this.setState({pruningOption3: this.state.radioPruningItems3[0].label});
    });
    //END

    //PRUNING 4
    this.state.radioPruningItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioPruningItems4: this.state.radioPruningItems4}, () => {
      this.setState({pruningOption4: this.state.radioPruningItems4[0].label});
    });
    //END

    //TWISTING 1
    this.state.radioTwistingItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioTwistingItems1: this.state.radioTwistingItems1}, () => {
      this.setState({twistingOption1: this.state.radioTwistingItems1[0].label});
    });
    //END

    //TWISTING 2
    this.state.radioTwistingItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioTwistingItems2: this.state.radioTwistingItems2}, () => {
      this.setState({twistingOption2: this.state.radioTwistingItems2[0].label});
    });
    //END

    //TWISTING 3
    this.state.radioTwistingItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioTwistingItems3: this.state.radioTwistingItems3}, () => {
      this.setState({twistingOption3: this.state.radioTwistingItems3[0].label});
    });
    //END

    //TWISTING 4
    this.state.radioTwistingItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioTwistingItems4: this.state.radioTwistingItems4}, () => {
      this.setState({twistingOption4: this.state.radioTwistingItems4[0].label});
    });
    //END

    //PICKING 1
    this.state.radioPickingItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioPickingItems1: this.state.radioPickingItems1}, () => {
      this.setState({pickingOption1: this.state.radioPickingItems1[0].label});
    });
    //END

    //PICKING 2
    this.state.radioPickingItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioPickingItems2: this.state.radioPickingItems2}, () => {
      this.setState({pickingOption2: this.state.radioPickingItems2[0].label});
    });
    //END

    //PICKING 3
    this.state.radioPickingItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioPickingItems3: this.state.radioPickingItems3}, () => {
      this.setState({pickingOption3: this.state.radioPickingItems3[0].label});
    });
    //END

    //PICKING 4
    this.state.radioPickingItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioPickingItems4: this.state.radioPickingItems4}, () => {
      this.setState({pickingOption4: this.state.radioPickingItems4[0].label});
    });
    //END

    //DELEAFING 1
    this.state.radioDeleafingItems1.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioDeleafingItems1: this.state.radioDeleafingItems1},
      () => {
        this.setState({
          deleafingOption1: this.state.radioDeleafingItems1[0].label,
        });
      },
    );
    //END

    //DELEAFING 2
    this.state.radioDeleafingItems2.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioDeleafingItems2: this.state.radioDeleafingItems2},
      () => {
        this.setState({
          deleafingOption2: this.state.radioDeleafingItems2[0].label,
        });
      },
    );
    //END

    //DELEAFING 3
    this.state.radioDeleafingItems3.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioDeleafingItems3: this.state.radioDeleafingItems3},
      () => {
        this.setState({
          deleafingOption3: this.state.radioDeleafingItems3[0].label,
        });
      },
    );
    //END

    //DELEAFING 4
    this.state.radioDeleafingItems4.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioDeleafingItems4: this.state.radioDeleafingItems4},
      () => {
        this.setState({
          deleafingOption4: this.state.radioDeleafingItems4[0].label,
        });
      },
    );
    //END

    //DROPPING 1
    this.state.radioDroppingItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioDroppingItems1: this.state.radioDroppingItems1}, () => {
      this.setState({droppingOption1: this.state.radioDroppingItems1[0].label});
    });
    //END

    //DROPPING 2
    this.state.radioDroppingItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioDroppingItems2: this.state.radioDroppingItems2}, () => {
      this.setState({droppingOption2: this.state.radioDroppingItems2[0].label});
    });
    //END

    //DROPPING 3
    this.state.radioDroppingItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioDroppingItems3: this.state.radioDroppingItems3}, () => {
      this.setState({droppingOption3: this.state.radioDroppingItems3[0].label});
    });
    //END

    //DROPPING 4
    this.state.radioDroppingItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioDroppingItems4: this.state.radioDroppingItems4}, () => {
      this.setState({droppingOption4: this.state.radioDroppingItems4[0].label});
    });
    //END

    //this.textInput.clear()
  };

  clearClippingRadio = () => {
    //CLIPPING 1
    this.state.radioClippingItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioClippingItems1: this.state.radioClippingItems1}, () => {
      this.setState({clippingOption1: this.state.radioClippingItems1[0].label});
    });
    //END

    //CLIPPING 2
    this.state.radioClippingItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioClippingItems2: this.state.radioClippingItems2}, () => {
      this.setState({clippingOption2: this.state.radioClippingItems2[0].label});
    });
    //END

    //CLIPPING 3
    this.state.radioClippingItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioClippingItems3: this.state.radioClippingItems3}, () => {
      this.setState({clippingOption3: this.state.radioClippingItems3[0].label});
    });
    //END

    //CLIPPING 4
    this.state.radioClippingItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioClippingItems4: this.state.radioClippingItems4}, () => {
      this.setState({clippingOption4: this.state.radioClippingItems4[0].label});
    });
    //END
  };

  clearTrussCuttingRadio = () => {
    //TRUSS CUTTING 1
    this.state.radioTrussCuttingItems1.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioTrussCuttingItems1: this.state.radioTrussCuttingItems1},
      () => {
        this.setState({
          trussCuttingOption1: this.state.radioTrussCuttingItems1[0].label,
        });
      },
    );
    //END

    //TRUSS CUTTING 2
    this.state.radioTrussCuttingItems2.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioTrussCuttingItems2: this.state.radioTrussCuttingItems2},
      () => {
        this.setState({
          trussCuttingOption2: this.state.radioTrussCuttingItems2[0].label,
        });
      },
    );
    //END

    //TRUSS CUTTING 3
    this.state.radioTrussCuttingItems3.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioTrussCuttingItems3: this.state.radioTrussCuttingItems3},
      () => {
        this.setState({
          trussCuttingOption3: this.state.radioTrussCuttingItems3[0].label,
        });
      },
    );
    //END

    //TRUSS CUTTING 4
    this.state.radioTrussCuttingItems4.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioTrussCuttingItems4: this.state.radioTrussCuttingItems4},
      () => {
        this.setState({
          trussCuttingOption4: this.state.radioTrussCuttingItems4[0].label,
        });
      },
    );
    //END
  };

  clearDensityRadio = () => {
    //DENSITY 1
    this.state.radioDensityItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioDensityItems1: this.state.radioDensityItems1}, () => {
      this.setState({
        densityOption1: this.state.radioDensityItems1[0].label,
      });
    });
    //END

    //DENSITY 2
    this.state.radioDensityItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioDensityItems2: this.state.radioDensityItems2}, () => {
      this.setState({
        densityOption2: this.state.radioDensityItems2[0].label,
      });
    });
    //END

    //DENSITY 3
    this.state.radioDensityItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioDensityItems3: this.state.radioDensityItems3}, () => {
      this.setState({
        densityOption3: this.state.radioDensityItems3[0].label,
      });
    });
    //END

    //DENSITY 4
    this.state.radioDensityItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioDensityItems4: this.state.radioDensityItems4}, () => {
      this.setState({
        densityOption4: this.state.radioDensityItems4[0].label,
      });
    });
    //END
  };

  clearPruningRadio = () => {
    //PRUNING 1
    this.state.radioPruningItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioPruningItems1: this.state.radioPruningItems1}, () => {
      this.setState({pruningOption1: this.state.radioPruningItems1[0].label});
    });
    //END

    //PRUNING 2
    this.state.radioPruningItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioPruningItems2: this.state.radioPruningItems2}, () => {
      this.setState({pruningOption2: this.state.radioPruningItems2[0].label});
    });
    //END

    //PRUNING 3
    this.state.radioPruningItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioPruningItems3: this.state.radioPruningItems3}, () => {
      this.setState({pruningOption3: this.state.radioPruningItems3[0].label});
    });
    //END

    //PRUNING 4
    this.state.radioPruningItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioPruningItems4: this.state.radioPruningItems4}, () => {
      this.setState({pruningOption4: this.state.radioPruningItems4[0].label});
    });
    //END
  };

  clearTwistingRadio = () => {
    //TWISTING 1
    this.state.radioTwistingItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioTwistingItems1: this.state.radioTwistingItems1}, () => {
      this.setState({twistingOption1: this.state.radioTwistingItems1[0].label});
    });
    //END

    //TWISTING 2
    this.state.radioTwistingItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioTwistingItems2: this.state.radioTwistingItems2}, () => {
      this.setState({twistingOption2: this.state.radioTwistingItems2[0].label});
    });
    //END

    //TWISTING 3
    this.state.radioTwistingItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioTwistingItems3: this.state.radioTwistingItems3}, () => {
      this.setState({twistingOption3: this.state.radioTwistingItems3[0].label});
    });
    //END

    //TWISTING 4
    this.state.radioTwistingItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioTwistingItems4: this.state.radioTwistingItems4}, () => {
      this.setState({twistingOption4: this.state.radioTwistingItems4[0].label});
    });
    //END
  };

  clearPickingRadio = () => {
    //PICKING 1
    this.state.radioPickingItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioPickingItems1: this.state.radioPickingItems1}, () => {
      this.setState({pickingOption1: this.state.radioPickingItems1[0].label});
    });
    //END

    //PICKING 2
    this.state.radioPickingItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioPickingItems2: this.state.radioPickingItems2}, () => {
      this.setState({pickingOption2: this.state.radioPickingItems2[0].label});
    });
    //END

    //PICKING 3
    this.state.radioPickingItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioPickingItems3: this.state.radioPickingItems3}, () => {
      this.setState({pickingOption3: this.state.radioPickingItems3[0].label});
    });
    //END

    //PICKING 4
    this.state.radioPickingItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioPickingItems4: this.state.radioPickingItems4}, () => {
      this.setState({pickingOption4: this.state.radioPickingItems4[0].label});
    });
    //END
  };

  clearDeleafingRadio = () => {
    //DELEAFING 1
    this.state.radioDeleafingItems1.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioDeleafingItems1: this.state.radioDeleafingItems1},
      () => {
        this.setState({
          deleafingOption1: this.state.radioDeleafingItems1[0].label,
        });
      },
    );
    //END

    //DELEAFING 2
    this.state.radioDeleafingItems2.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioDeleafingItems2: this.state.radioDeleafingItems2},
      () => {
        this.setState({
          deleafingOption2: this.state.radioDeleafingItems2[0].label,
        });
      },
    );
    //END

    //DELEAFING 3
    this.state.radioDeleafingItems3.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioDeleafingItems3: this.state.radioDeleafingItems3},
      () => {
        this.setState({
          deleafingOption3: this.state.radioDeleafingItems3[0].label,
        });
      },
    );
    //END

    //DELEAFING 4
    this.state.radioDeleafingItems4.map((item) => {
      item.selected = false;
    });

    this.setState(
      {radioDeleafingItems4: this.state.radioDeleafingItems4},
      () => {
        this.setState({
          deleafingOption4: this.state.radioDeleafingItems4[0].label,
        });
      },
    );
    //END
  };

  clearDroppingRadio = () => {
    //DROPPING 1
    this.state.radioDroppingItems1.map((item) => {
      item.selected = false;
    });

    this.setState({radioDroppingItems1: this.state.radioDroppingItems1}, () => {
      this.setState({droppingOption1: this.state.radioDroppingItems1[0].label});
    });
    //END

    //DROPPING 2
    this.state.radioDroppingItems2.map((item) => {
      item.selected = false;
    });

    this.setState({radioDroppingItems2: this.state.radioDroppingItems2}, () => {
      this.setState({droppingOption2: this.state.radioDroppingItems2[0].label});
    });
    //END

    //DROPPING 3
    this.state.radioDroppingItems3.map((item) => {
      item.selected = false;
    });

    this.setState({radioDroppingItems3: this.state.radioDroppingItems3}, () => {
      this.setState({droppingOption3: this.state.radioDroppingItems3[0].label});
    });
    //END

    //DROPPING 4
    this.state.radioDroppingItems4.map((item) => {
      item.selected = false;
    });

    this.setState({radioDroppingItems4: this.state.radioDroppingItems4}, () => {
      this.setState({droppingOption4: this.state.radioDroppingItems4[0].label});
    });
    //END
  };

  saveDataToDB = () => {
    var that = this;
    this.setState({isLoading: true});

    const {auditorsName} = this.state;
    const {houseNumber} = this.state;
    const {rowNumber} = this.state;
    const {weekNumber} = this.state;
    const {clippingOption1} = this.state;
    const {clippingOption2} = this.state;
    const {clippingOption3} = this.state;
    const {clippingOption4} = this.state;
    const {pruningOption1} = this.state;
    const {pruningOption2} = this.state;
    const {pruningOption3} = this.state;
    const {pruningOption4} = this.state;
    const {twistingOption1} = this.state;
    const {twistingOption2} = this.state;
    const {twistingOption3} = this.state;
    const {twistingOption4} = this.state;
    const {pickingOption1} = this.state;
    const {pickingOption2} = this.state;
    const {pickingOption3} = this.state;
    const {pickingOption4} = this.state;
    const {deleafingOption1} = this.state;
    const {deleafingOption2} = this.state;
    const {deleafingOption3} = this.state;
    const {deleafingOption4} = this.state;
    const {qualityPercentage} = this.state;
    const {comments} = this.state;
    const {data_send} = this.state;

    if (auditorsName) {
      if (houseNumber) {
        if (rowNumber) {
          /*if (clippingOption1) {
                        if (clippingOption2) {
                            if (clippingOption3) {
                                if (clippingOption4) {
                                    if (pruningOption1) {
                                        if (pruningOption2) {
                                            if (pruningOption3) {
                                                if (pruningOption4) {
                                                    if (twistingOption1) {
                                                        if (twistingOption2) {
                                                            if (twistingOption3) {
                                                                if (twistingOption4) {
                                                                    if (pickingOption1) {
                                                                        if (pickingOption2) {
                                                                            if (pickingOption3) {
                                                                                if (pickingOption4) {
                                                                                    if (deleafingOption1) {
                                                                                        if (deleafingOption2) {
                                                                                            if (deleafingOption3) {
                                                                                                if (deleafingOption4) {*/

          if (this.state.isItConnected === 'Online') {
            console.log('Connected to internet');

            const scriptUrl =
              'https://script.google.com/macros/s/AKfycbz69p6TE-1FMKQsh19dqkR4CFJfao5UnGUJIB1npBV2MWHrR9w/exec';
            const url = `${scriptUrl}?
            callback=ctrlq&action=${'doPostOha'}&auditor_name=${
              that.state.auditorsName
            }&house_number=${that.state.houseNumber}&row_number=${
              that.state.rowNumber
            }&week_number=${that.state.weekNumber}&clipping_data1=${
              that.state.clippingOption1
            }&clipping_data2=${that.state.clippingOption2}&clipping_data3=${
              that.state.clippingOption3
            }&clipping_data4=${that.state.clippingOption4}&pruning_data1=${
              that.state.pruningOption1
            }&pruning_data2=${that.state.pruningOption2}&pruning_data3=${
              that.state.pruningOption3
            }&pruning_data4=${that.state.pruningOption4}&twisting_data1=${
              that.state.twistingOption1
            }&twisting_data2=${that.state.twistingOption2}&twisting_data3=${
              that.state.twistingOption3
            }&twisting_data4=${that.state.twistingOption4}&picking_data1=${
              that.state.pickingOption1
            }&picking_data2=${that.state.pickingOption2}&picking_data3=${
              that.state.pickingOption3
            }&picking_data4=${that.state.pickingOption4}&deleafing_data1=${
              that.state.deleafingOption1
            }&deleafing_data2=${that.state.deleafingOption2}&deleafing_data3=${
              that.state.deleafingOption3
            }&deleafing_data4=${that.state.deleafingOption4}&dropping_data1=${
              that.state.droppingOption1
            }&dropping_data2=${that.state.droppingOption2}&dropping_data3=${
              that.state.droppingOption3
            }&dropping_data4=${that.state.droppingOption4}&trusscutting_data1=${
              that.state.trussCuttingOption1
            }&trusscutting_data2=${
              that.state.trussCuttingOption2
            }&trusscutting_data3=${
              that.state.trussCuttingOption3
            }&trusscutting_data4=${
              that.state.trussCuttingOption4
            }&density_data1=${that.state.densityOption1}&density_data2=${
              that.state.densityOption2
            }&density_data3=${that.state.densityOption3}&density_data4=${
              that.state.densityOption4
            }&quality_percent=${
              that.state.qualityPercentage
            }&general_comments=${that.state.comments}`;

            console.log('URL : ' + url);
            fetch(url, {mode: 'no-cors'}).then(() => {
              console.log('Data Send');
            });
            realm.write(() => {
              var ID =
                realm.objects('TL_quality_sheet').sorted('entry_id', true)
                  .length > 0
                  ? realm
                      .objects('TL_quality_sheet')
                      .sorted('entry_id', true)[0].entry_id + 1
                  : 1;
              realm.create('TL_quality_sheet', {
                entry_id: ID,
                auditor_name: that.state.auditorsName,
                house_number: that.state.houseNumber,
                row_number: that.state.rowNumber,
                week_number: that.state.weekNumber,
                clipping_data1: that.state.clippingOption1,
                clipping_data2: that.state.clippingOption2,
                clipping_data3: that.state.clippingOption3,
                clipping_data4: that.state.clippingOption4,
                pruning_data1: that.state.pruningOption1,
                pruning_data2: that.state.pruningOption2,
                pruning_data3: that.state.pruningOption3,
                pruning_data4: that.state.pruningOption4,
                twisting_data1: that.state.twistingOption1,
                twisting_data2: that.state.twistingOption2,
                twisting_data3: that.state.twistingOption3,
                twisting_data4: that.state.twistingOption4,
                picking_data1: that.state.pickingOption1,
                picking_data2: that.state.pickingOption2,
                picking_data3: that.state.pickingOption3,
                picking_data4: that.state.pickingOption4,
                deleafing_data1: that.state.deleafingOption1,
                deleafing_data2: that.state.deleafingOption2,
                deleafing_data3: that.state.deleafingOption3,
                deleafing_data4: that.state.deleafingOption4,
                dropping_data1: that.state.droppingOption1,
                dropping_data2: that.state.droppingOption2,
                dropping_data3: that.state.droppingOption3,
                dropping_data4: that.state.droppingOption4,
                arching_data1: '',
                arching_data2: '',
                arching_data3: '',
                arching_data4: '',
                quality_percent: that.state.qualityPercentage,
                data_send: 'Y',
              });

              this.resetRadioButtons();
              this.setState({
                clippingOption1: '',
                clippingOption2: '',
                clippingOption3: '',
                clippingOption4: '',

                droppingOption1: '',
                droppingOption2: '',
                droppingOption3: '',
                droppingOption4: '',

                pruningOption1: '',
                pruningOption2: '',
                pruningOption3: '',
                pruningOption4: '',

                twistingOption1: '',
                twistingOption2: '',
                twistingOption3: '',
                twistingOption4: '',

                deleafingOption1: '',
                deleafingOption2: '',
                deleafingOption3: '',
                deleafingOption4: '',

                pickingOption1: '',
                pickingOption2: '',
                pickingOption3: '',
                pickingOption4: '',

                trussCuttingOption1: '',
                trussCuttingOption2: '',
                trussCuttingOption3: '',
                trussCuttingOption4: '',

                densityOption1: '',
                densityOption2: '',
                densityOption3: '',
                densityOption4: '',

                qualityPercentage: 0,
                comments: '',
              });
              this.props.navigation.navigate('OhaQualityActivity');
              Toast.showWithGravity(
                'Success!! \nDetails Added Successfully.',
                Toast.LONG,
                Toast.CENTER,
              );
              this.setState({isLoading: false});
            });
          } else {
            console.log('Not connected to internet');

            realm.write(() => {
              var ID =
                realm.objects('TL_quality_sheet').sorted('entry_id', true)
                  .length > 0
                  ? realm
                      .objects('TL_quality_sheet')
                      .sorted('entry_id', true)[0].entry_id + 1
                  : 1;
              realm.create('TL_quality_sheet', {
                entry_id: ID,
                auditor_name: that.state.auditorsName,
                house_number: that.state.houseNumber,
                row_number: that.state.rowNumber,
                week_number: that.state.weekNumber,
                clipping_data1: that.state.clippingOption1,
                clipping_data2: that.state.clippingOption2,
                clipping_data3: that.state.clippingOption3,
                clipping_data4: that.state.clippingOption4,
                pruning_data1: that.state.pruningOption1,
                pruning_data2: that.state.pruningOption2,
                pruning_data3: that.state.pruningOption3,
                pruning_data4: that.state.pruningOption4,
                twisting_data1: that.state.twistingOption1,
                twisting_data2: that.state.twistingOption2,
                twisting_data3: that.state.twistingOption3,
                twisting_data4: that.state.twistingOption4,
                picking_data1: that.state.pickingOption1,
                picking_data2: that.state.pickingOption2,
                picking_data3: that.state.pickingOption3,
                picking_data4: that.state.pickingOption4,
                deleafing_data1: that.state.deleafingOption1,
                deleafing_data2: that.state.deleafingOption2,
                deleafing_data3: that.state.deleafingOption3,
                deleafing_data4: that.state.deleafingOption4,
                dropping_data1: that.state.droppingOption1,
                dropping_data2: that.state.droppingOption2,
                dropping_data3: that.state.droppingOption3,
                dropping_data4: that.state.droppingOption4,
                arching_data1: '',
                arching_data2: '',
                arching_data3: '',
                arching_data4: '',
                quality_percent: that.state.qualityPercentage,
                data_send: 'N',
              });

              this.resetRadioButtons();
              this.setState({
                clippingOption1: '',
                clippingOption2: '',
                clippingOption3: '',
                clippingOption4: '',

                droppingOption1: '',
                droppingOption2: '',
                droppingOption3: '',
                droppingOption4: '',

                pruningOption1: '',
                pruningOption2: '',
                pruningOption3: '',
                pruningOption4: '',

                twistingOption1: '',
                twistingOption2: '',
                twistingOption3: '',
                twistingOption4: '',

                deleafingOption1: '',
                deleafingOption2: '',
                deleafingOption3: '',
                deleafingOption4: '',

                pickingOption1: '',
                pickingOption2: '',
                pickingOption3: '',
                pickingOption4: '',

                trussCuttingOption1: '',
                trussCuttingOption2: '',
                trussCuttingOption3: '',
                trussCuttingOption4: '',

                densityOption1: '',
                densityOption2: '',
                densityOption3: '',
                densityOption4: '',

                qualityPercentage: 0,
                comments: '',
              });
              this.props.navigation.navigate('OhaQualityActivity');

              Toast.show('Success!! \nDetails Added Successfully.', Toast.LONG);
              this.setState({isLoading: false});
            });
          }

          /* } else {
                         this.setState({ isLoading: false })
                         alert('Choose one option from deleafing quality check 4')
            
                     }
            
                 } else {
                     this.setState({ isLoading: false })
                     alert('Choose one option from deleafing quality check 3')
                 }
            
             } else {
                 this.setState({ isLoading: false })
                 alert('Choose one option from deleafing quality check 2')
            
             }
            
            } else {
             this.setState({ isLoading: false })
             alert('Choose one option from deleafing quality check 1')
            
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from picking quality check 4')
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from picking quality check 3')
            
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from picking quality check 2')
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from picking quality check 1')
            
            }
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from twisting quality check 4')
            
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from twisting quality check 3')
            
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from twisting quality check 2')
            
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from twisting quality check 1')
            
            }
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from pruning quality check 4')
            
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from pruning quality check 3')
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from pruning quality check 2')
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from pruning quality check 1')
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from clipping quality check 4')
            
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from pruning quality check 3')
            
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from pruning quality check 2')
            
            }
            
            } else {
            this.setState({ isLoading: false })
            alert('Choose one option from pruning quality check 1')
            
            }*/
        } else {
          this.setState({isLoading: false});
          alert('Please fill row number');
        }
      } else {
        this.setState({isLoading: false});
        alert('Please select house number');
      }
    } else {
      this.setState({isLoading: false});
      alert('Please select auditor name');
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background2.png')}
          style={styles.backgroundImage}>
          <ScrollView
            style={styles.formContainer}
            keyboardShouldPersistTaps="handled">
            <Text style={styles.headerText}>Enter Quality Details</Text>

            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension}></View>

            <Text style={styles.titleHeadingText}>Select Auditor's Name</Text>

            <View style={styles.marginDimension}></View>

            <View
              style={{
                // The solution: Apply zIndex to any device except Android
                ...(Platform.OS !== 'android' && {
                  zIndex: 20,
                }),
              }}>
              <DropDownPicker
                items={[
                  {label: 'Ravi Sarju', value: 'Ravi Sarju'},
                  {label: 'Davinash Naicker', value: 'Davinash Naicker'},
                  {label: 'Andrew Hutchinson', value: 'Andrew Hutchinson'},
                  {label: 'Jeremy Whitten', value: 'Jeremy Whitten'},
                  {label: 'Ben Smith', value: 'Ben Smith'},
                ]}
                placeholder="SELECT"
                containerStyle={{height: 50}}
                style={{
                  backgroundColor: '#ffffff',
                  marginRight: 20,
                  borderColor: '#000000',
                  borderWidth: 1,
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                labelStyle={{
                  fontSize: 15,
                  textAlign: 'left',
                  color: '#000000',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={(item) =>
                  this.setState({
                    auditorsName: item.value,
                  })
                }
              />
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeadingText}>Select House Number</Text>

            <View style={styles.marginDimension}></View>

            <View
              style={{
                // The solution: Apply zIndex to any device except Android
                ...(Platform.OS !== 'android' && {
                  zIndex: 10,
                }),
              }}>
              <DropDownPicker
                items={[
                  {label: 'OHA 1', value: 'OHA 1'},
                  {label: 'OHA 2N', value: 'OHA 2N'},
                  {label: 'OHA 2S', value: 'OHA 2S'},
                ]}
                placeholder="SELECT"
                containerStyle={{height: 50}}
                style={{
                  backgroundColor: '#ffffff',
                  marginRight: 20,
                  borderColor: '#000000',
                  borderWidth: 1,
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                labelStyle={{
                  fontSize: 15,
                  textAlign: 'left',
                  color: '#000000',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={(item) =>
                  this.setState({
                    houseNumber: item.value,
                  })
                }
              />
            </View>
            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeadingText}>Enter Row Number</Text>

            <View style={styles.borderEdit}>
              <TextInput
                style={styles.textInputStyle}
                autoCapitalize="none"
                multiline={false}
                maxLength={5}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChangeText={(text) =>
                  this.setState({
                    rowNumber: text,
                  })
                }
                returnKeyType={'done'}
                keyboardType={'numeric'}
                ref={(input) => {
                  this.textInput = input;
                }}
              />
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.direction}>
              <Text style={styles.text}></Text>
              <Text style={styles.text}>CLIPPING</Text>
              <Text style={styles.textClear} onPress={this.clearClippingRadio}>
                Clear
              </Text>
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              1) Clip position: not above a truss/one clip between truss/half
              twist <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioClippingItems1.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioClippingButton1.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              2) Broken heads and trusses{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioClippingItems2.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioClippingButton2.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              3) Broken heads replaced and bobbin hung{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioClippingItems3.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioClippingButton3.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              4) Laterals: take laterals from previous clip to the head, fail if
              larger than finger nail{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioClippingItems4.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioClippingButton4.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.direction}>
              <Text style={styles.text}></Text>
              <Text style={styles.text}>PRUNING</Text>
              <Text style={styles.textClear} onPress={this.clearPruningRadio}>
                Clear
              </Text>
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              1) Accuracy: prune to the correct number and remove flag leaf +
              King fruit <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioPruningItems1.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioPruningButton1.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              2) Position of arch: proper{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioPruningItems2.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioPruningButton2.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              3) Pruning and arching at the right stage. Arch: as long as it
              fits and doesn't touch last bud{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioPruningItems3.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioPruningButton3.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              4) No broken trusses <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioPruningItems4.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioPruningButton4.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.direction}>
              <Text style={styles.text}></Text>
              <Text style={styles.text}>TWISTING</Text>
              <Text style={styles.textClear} onPress={this.clearTwistingRadio}>
                Clear
              </Text>
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              1) Trusses and leaves not trapped, and not wound too much{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioTwistingItems1.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioTwistingButton1.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              2) Broken heads and trusses{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioTwistingItems2.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioTwistingButton2.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              3) Broken heads replaced and bobbin hung{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioTwistingItems3.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioTwistingButton3.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              4) Laterals: take laterals from previous twist to the head, fail
              if larger than finger nail{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioTwistingItems4.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioTwistingButton4.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.direction}>
              <Text style={styles.text}></Text>
              <Text style={styles.text}>PICKING</Text>
              <Text style={styles.textClear} onPress={this.clearPickingRadio}>
                Clear
              </Text>
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              1) No floor fruit <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioPickingItems1.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioPickingButton1.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              2) Colour stage and missing fruit{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioPickingItems2.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioPickingButton2.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              3) Fruit graded out: rotten, damaged, miss-set{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioPickingItems3.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioPickingButton3.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              4) No plant materials and calyx{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioPickingItems4.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioPickingButton4.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.direction}>
              <Text style={styles.text}></Text>
              <Text style={styles.text}>DELEAFING</Text>
              <Text style={styles.textClear} onPress={this.clearDeleafingRadio}>
                Clear
              </Text>
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              1) Clean cut - minimize stubs and bad cuts{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDeleafingItems1.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDeleafingButton1.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              2) Accuracy: correct range of leaves removed for whole line{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDeleafingItems2.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDeleafingButton2.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              3) Stem and middle laterals taken, stems on hoops{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDeleafingItems3.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDeleafingButton3.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              4) Laterals: no sliced fruit, minimizes broken trusses, dead
              plants reported <Text style={styles.redColor}>(1 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDeleafingItems4.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDeleafingButton4.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.direction}>
              <Text style={styles.text}></Text>
              <Text style={styles.text}>DROPPING</Text>
              <Text style={styles.textClear} onPress={this.clearDroppingRadio}>
                Clear
              </Text>
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              1) Spacing: heads levelled and vines going down are spaced{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDroppingItems1.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDroppingButton1.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              2) Angle is correct - drop and shift the same - Cubes not ripped{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDroppingItems2.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDroppingButton2.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              3) Stems on the hoops, turning around properly{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDroppingItems3.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDroppingButton3.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              4) Minimize floor fruit and broken trusses{' '}
              <Text style={styles.redColor}>(3 each)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDroppingItems4.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDroppingButton4.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.direction}>
              <Text style={styles.text}></Text>
              <Text style={styles.text}>TRUSS CUTTING</Text>
              <Text
                style={styles.textClear}
                onPress={this.clearTrussCuttingRadio}>
                Clear
              </Text>
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              1) Clean cuts and no stubs{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioTrussCuttingItems1.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioTrussCuttingButton1.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              2) No missing empty trusses{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioTrussCuttingItems2.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioTrussCuttingButton2.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              3) Dead plants/stems removed{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioTrussCuttingItems3.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioTrussCuttingButton3.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              4) No weeds in base of plants{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioTrussCuttingItems4.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioTrussCuttingButton4.bind(
                    this,
                    key,
                  )}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.direction}>
              <Text style={styles.text}></Text>
              <Text style={styles.text}>DENSITY</Text>
              <Text style={styles.textClear} onPress={this.clearDensityRadio}>
                Clear
              </Text>
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              1) Less than 3 broken heads per row{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDensityItems1.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDensityButton1.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              2) Clip is applied above broken head to indicate to others{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDensityItems2.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDensityButton2.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              3) New bobbin is hung / or plant has been clipped to adjacent
              bobbin <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDensityItems3.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDensityButton3.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeading2Text}>
              4) A lateral has been left to grow{' '}
              <Text style={styles.redColor}>(0)</Text>{' '}
            </Text>

            <View style={styles.inBtnmarginDimension}></View>

            <View style={styles.flexDirection}>
              {this.state.radioDensityItems4.map((item, key) => (
                <RadioButton
                  key={key}
                  button={item}
                  onClick={this.changeActiveRadioDensityButton4.bind(this, key)}
                />
              ))}
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <Text style={styles.titleHeadingText}>
              Enter Comments (Optional)
            </Text>

            <View style={styles.borderEdit}>
              <TextInput
                style={styles.textInputStyle}
                autoCapitalize="none"
                multiline={false}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChangeText={(text) =>
                  this.setState({
                    comments: text,
                  })
                }
                returnKeyType={'done'}
                keyboardType={'default'}
                ref={(input) => {
                  this.textInput = input;
                }}
              />
            </View>

            <View style={styles.inBtnmarginDimension}></View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.calculateQualityPercentage}>
              <Text style={styles.buttonText1}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },

  buttonText1: {
    fontSize: 23,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  flexDirection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleHeadingText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

  redColor: {
    color: 'blue',
  },

  titleHeading2Text: {
    color: 'black',
    fontSize: 16,
  },
  text: {
    color: 'blue',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    color: '#000000',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'underline',
  },

  textInputStyle: {
    fontSize: 15,
    color: 'black',
    marginLeft: 10,
    marginRight: 20,
    height: 50,
    backgroundColor: '#ffffff',
  },

  borderEdit: {
    marginTop: 8,
    marginRight: 16,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
  },

  marginDimension: {
    marginTop: 10,
  },

  inBtnmarginDimension: {
    marginTop: 25,
  },

  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#54B948',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
    textAlign: 'center',
  },

  formContainer: {
    //backgroundColor: 'rgba(192,192,192,0.55)',
    //borderRadius: 5,
    padding: 5,
    margin: 10,
    height: '100%',
    width: '100%',
  },

  buttonContainer: {
    backgroundColor: '#2C903D',
    borderRadius: 5,
    padding: 10,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 19,
    color: '#000000',
    fontWeight: 'bold',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  FloatingButtonStyle2: {
    resizeMode: 'contain',
    marginLeft: 15,
  },

  radioButton: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioButtonHolder: {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioIcon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    marginLeft: 10,
    fontSize: 20,
  },

  selectedTextHolder: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedText: {
    fontSize: 18,
    color: 'white',
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textClear: {
    color: '#2C903D',
    fontSize: 16,
    textAlign: 'right',
    fontStyle: 'italic',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
    fontWeight: 'bold',
  },
});
