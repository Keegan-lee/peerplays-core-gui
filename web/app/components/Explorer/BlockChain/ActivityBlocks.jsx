/*
 *  Copyright (c) 2015 Cryptonomex, Inc., and contributors.
 *
 *  The MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

import React from "react";
import {connect} from 'react-redux';
import counterpart from "counterpart";
import Operation from "./Operation";
import CustomScroll from 'react-custom-scroll';
import SLoader from '../../Loaders/SLoader';

class ActivityBlocks extends React.Component {

    render() {

        let {operations} = this.props;

        let operationData = operations
            .map((operation) => {
                return <Operation key={operation.operation_index} created_at={operation.created_at} type={operation.type} fee_asset={operation.fee_asset} fee_amount={operation.fee_amount} deltaBlocks={operation.deltaBlocks} operation={operation.operation}/>
            });

        return (
            <div className="table__section">
                <h2 className="h2">{counterpart.translate("explore.recent_activity.title")}</h2>
                <div className="table table2 table-db-rec-activity table-scroll">
                    <div className="table__head tableRow">
                        <div className="tableCell">{counterpart.translate("explore.recent_activity.operation")}</div>
                        <div className="tableCell">{counterpart.translate("explore.recent_activity.sender")}</div>
                        <div className="tableCell">{counterpart.translate("explore.recent_activity.receiver")}</div>
                        <div className="tableCell">{counterpart.translate("explore.recent_activity.description")}</div>
                        <div className="tableCell text_r">{counterpart.translate("explore.recent_activity.date")}</div>
                    </div>

                    <CustomScroll allowOuterScroll={true}>
                        <div className="table__body table__scroll maxHeight-620">

                            {operations.size ? operationData : <SLoader />}

                        </div>
                    </CustomScroll>

                </div>
            </div>
        )
    }
}

ActivityBlocks = connect(
    (state) => {
        return {
            operations: state.explorerBlockchainPage.operations,
            coreAsset: state.explorerBlockchainPage.coreAsset
        };
    }
)(ActivityBlocks);

export default ActivityBlocks;