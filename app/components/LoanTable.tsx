// @flow
import * as React from 'react';
import {
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic';
import {Avatar} from 'baseui/avatar';
import {Button, KIND, SIZE} from 'baseui/button';
import {Tag} from 'baseui/tag';
import {useStyletron} from 'baseui';
import {ArrowUp, ArrowDown} from 'baseui/icon';
import moment from 'moment';

function AvatarCell({
  src,
  title,
  subtitle,
}: {
  src: string;
  title: string;
  subtitle: string;
}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({display: 'flex', alignItems: 'center'})}>
      <Avatar name={title} size="48px" src={src} />
      <div
        className={css({
          paddingLeft: theme.sizing.scale550,
          whiteSpace: 'nowrap',
        })}
      >
        <p
          className={css({
            ...theme.typography.LabelSmall,
            margin: 0,
          })}
        >
          {title}
        </p>
        <p
          className={css({
            ...theme.typography.ParagraphSmall,
            marginBottom: 0,
            marginTop: '4px',
          })}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
function NumberCell({
  value,
  delta,
}: {
  value: number;
  delta: number;
}) {
  const [css, theme] = useStyletron();
  const positive = delta >= 0;
  return (
    <div className={css({display: 'flex', alignItems: 'center'})}>
      <span
        className={css({...theme.typography.MonoParagraphSmall})}
      >
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value)}
      </span>
      <div
        className={css({
          alignItems: 'center',
          display: 'flex',
          paddingLeft: theme.sizing.scale300,
          color: positive
            ? theme.colors.contentPositive
            : theme.colors.contentNegative,
        })}
      >
        {positive ? <ArrowUp /> : <ArrowDown />}
        <span
          className={css({
            ...theme.typography.MonoLabelSmall,
            paddingLeft: '2px',
          })}
        >
          {delta}%
        </span>
      </div>
    </div>
  );
}
function TimeCell({value}: {value: number}) {
  const [css] = useStyletron();
  return (
    <div className={css({display: 'flex', alignItems: 'center'})}>
      {value ? moment.unix(value).format("YYYY-MM-DD HH:mm:ss") : '-' }
    </div>
  );
}

function SolCell({value}: {value: number}) {
  const [css] = useStyletron();
  return (
    <div className={css({display: 'flex', alignItems: 'center'})}>
      ◎ { (value / 10**9).toFixed(2) }
    </div>
  );
}

function TagsCell({tags}: {tags: Array<string>}) {
  const [css] = useStyletron();
  return (
    <div className={css({display: 'flex', alignItems: 'center'})}>
      {tags.map((tag) => {
        return (
          <Tag key={tag} closeable={false}>
            {tag}
          </Tag>
        );
      })}
    </div>
  );
}


function ButtonsCell({labels}: {labels: Array<string>}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({display: 'flex', alignItems: 'center'})}>
      {labels.map((label, index) => {
        return (
          <Button
            kind={KIND.secondary}
            size={SIZE.compact}
            overrides={{
              BaseButton: {
                style: {
                  marginLeft: index > 0 ? theme.sizing.scale300 : 0,
                },
              },
            }}
            key={label}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
export default function LoanTable({ loans, metadataByMintAddress }: any) {
  const data = loans.map((loan: any) => {
    return {
      market: loan.market,
      acceptBlocktime: loan.acceptBlocktime,
      apy: loan.apy,
      collateralMint: loan.collateralMint,
      loanDurationSeconds: loan.loanDurationSeconds,
      offerBlocktime: loan.offerBlocktime,
      principalAmount: loan.principalAmount,
      repayAmount: loan.repayAmount,
      repayBlocktime: loan.repayBlocktime,
      status: loan.status
    }
  })

  type Row = typeof data[0];


  return (
    <TableBuilder
      data={data}
    >
      <TableBuilderColumn<Row> header="Market">
        {(row) => (row.market) }
      </TableBuilderColumn>
      <TableBuilderColumn<Row> header="NFT">
        {(row) => (
          <AvatarCell
            src={metadataByMintAddress[row.collateralMint]?.image}
            title={metadataByMintAddress[row.collateralMint]?.name || '-'}
            subtitle={metadataByMintAddress[row.collateralMint]?.symbol || '-'}
          />
        )}
      </TableBuilderColumn>
      <TableBuilderColumn<Row> header="Status">
        {(row) => (row.status) }
      </TableBuilderColumn>
      <TableBuilderColumn<Row> header="APY">
        {(row) => (row.apy) }
      </TableBuilderColumn>
      <TableBuilderColumn<Row> header="Duration">
        {(row) => (row.loanDurationSeconds ? moment.duration(row.loanDurationSeconds, 'seconds').humanize() : '-') }
      </TableBuilderColumn>
      <TableBuilderColumn<Row> header="Principal Amount">
        {(row) => (<SolCell value={row.principalAmount} />) }
      </TableBuilderColumn>
      <TableBuilderColumn<Row> header="Repayment Amount">
        {(row) => (<SolCell value={row.repayAmount} />) }
      </TableBuilderColumn>
      <TableBuilderColumn<Row> header="Offer Time">
        {(row) => (<TimeCell value={row.offerBlocktime} />) }
      </TableBuilderColumn>
      <TableBuilderColumn<Row> header="Accepted Time">
        {(row) => (<TimeCell value={row.acceptBlocktime} />) }
      </TableBuilderColumn>
      <TableBuilderColumn<Row> header="Repayment Time">
        {(row) => (<TimeCell value={row.repayBlocktime} />) }
      </TableBuilderColumn>
      {/* <TableBuilderColumn<Row> header="Number positive">
        {(row) => (
          <NumberCell value={row.apy} delta={0.51} />
        )}
      </TableBuilderColumn>
      <TableBuilderColumn<Row> header="Number negative">
        {(row) => (
          <NumberCell value={row.principalAmount} delta={-0.51} />
        )}
      </TableBuilderColumn> */}
    </TableBuilder>
  );
}